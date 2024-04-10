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
        if (process.env.NODE_ENV !== 'test') publishMessage(JSON.stringify({ username: response.username, url: "https://api.jayv.tech/v1/verify"}))
        res.status(201).json(response)
      })
      .catch((error: Error) => {
        logger.error(`createUserController: ${error}`)
        res.status(400).json()
      })
  } catch (_) {
    res.status(400).json()
  }
}

const getUserController = async (req: Request, res: Response) => {
  try {
    const response: userResponse = await userService.getUser(
      res.locals.username
    )
    res.status(200).json(response)
  } catch (err) {
    logger.error(`getUserController: ${err}`)
    res.status(404).json()
  }
}

const updateUserController = async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.body).length === 0) {
      logger.error('updateUserController: no data provided')
      res.status(400).json()
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
        res.status(204).json()
      })
      .catch((error: Error) => {
        logger.error(`updateUserController: ${error}`)
        res.status(400).json()
      })
  } catch (_) {
    res.status(400).json()
  }
}

const verifyUserController = async (req: Request, res: Response) => {
  try {
    const { token } = req.params
    const tokenData: tokenDataType = await tokenService.getToken(token)
    if (tokenData.expires_at < new Date()) {
      logger.info('Token expired')
      res.status(410).json({ message: 'Verification Link Expired' })
      return
    }
    userService
      .verifyUser(tokenData.username)
      .then(() => {
        logger.info(
          `user verified successfully with username: ${tokenData.username}`
        )
        res.status(200).json({ meessage: 'User verified successfully' })
      })
      .catch((error: Error) => {
        if (error.message === 'User already verified') {
          logger.info(
            `user already verified with username: ${tokenData.username}`
          )
          res.status(200).json({ message: 'User already verified' })
          return
        }
        logger.error(`userVerifyController: ${error}`)
        res.status(400).json()
      })
  } catch (err) {
    logger.error(`userVerifyController: ${err}`)
    res.status(400).json()
  }
}

export const userController = {
  createUserController,
  getUserController,
  updateUserController,
  verifyUserController,
}
