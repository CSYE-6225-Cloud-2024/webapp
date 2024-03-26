import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import {
  userPostReqValidator,
  userPostRequest,
  userPutReqValidator,
  userPutRequest,
  userResponse,
} from '../validators/users'
import bcrypt from 'bcrypt'
import logger from '../util/logger'
import { publishMessage } from '../util/pub'
import { tokenDataType } from '../validators/token'
import { tokenService } from '../services/token.service'

const createUserController = async (req: Request, res: Response) => {
  try {
    const data: userPostRequest = await userPostReqValidator.parseAsync(
      req.body
    )
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    data.password = hashedPassword
    userService
      .createUser(data)
      .then((response: userResponse) => {
        logger.info(`created user with username: ${response.username}`)
        if (process.env.NODE_ENV !== 'test') publishMessage(response.username)
        res.status(201).send(response)
      })
      .catch((error: Error) => {
        logger.error(`createUserController: ${error}`)
        res.status(400).send()
      })
  } catch (_) {
    res.status(400).send()
  }
}

const getUserController = async (req: Request, res: Response) => {
  try {
    const response: userResponse = await userService.getUser(
      res.locals.username
    )
    res.status(200).send(response)
  } catch (err) {
    logger.error(`getUserController: ${err}`)
    res.status(404).send()
  }
}

const updateUserController = async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.body).length === 0) {
      logger.error('updateUserController: no data provided')
      res.status(400).send()
      return
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const data: userPutRequest = await userPutReqValidator.parseAsync(req.body)
    data.password = hashedPassword
    userService
      .updateUser(data, res.locals.username)
      .then(() => {
        logger.info(
          `user updated successfully with username: ${res.locals.username}`
        )
        res.status(204).send()
      })
      .catch((error: Error) => {
        logger.error(`updateUserController: ${error}`)
        res.status(400).send()
      })
  } catch (_) {
    res.status(400).send()
  }
}

const verifyUserController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const tokenData: tokenDataType = await tokenService.getToken(token)
    if (tokenData.expires_at < new Date()) {
      logger.info('Token expired')
      res.status(410).send({ message: 'Verification Link Expired' })
      return
    }
    userService
      .verifyUser(tokenData.username)
      .then(() => {
        logger.info(
          `user verified successfully with username: ${tokenData.username}`
        )
        res.status(200).send({ meessage: 'User verified successfully' })
      })
      .catch((error: Error) => {
        if (error.message === 'User already verified') {
          logger.info(
            `user already verified with username: ${tokenData.username}`
          )
          res.status(200).send({ message: 'User already verified' })
          return
        }
        logger.error(`userVerifyController: ${error}`)
        res.status(400).send()
      })
  } catch (err) {
    logger.error(`userVerifyController: ${err}`)
    res.status(400).send()
  }
}

export const userController = {
  createUserController,
  getUserController,
  updateUserController,
  verifyUserController,
}
