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

const createUserController = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const data: userPostRequest = await userPostReqValidator.parseAsync({
      ...req.body,
      password: hashedPassword,
    })
    userService
      .createUser(data)
      .then((response: userResponse) => {
        logger.info(`created user with username: ${response.username}`)
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

const getUserController = (req: Request, res: Response) => {
  userService
    .getUser(res.locals.username)
    .then((response: userResponse) => {
      logger.info(`getUserController: ${response.username}`)
      res.status(200).send(response)
    })
    .catch((error: Error) => {
      logger.error(`getUserController: ${error}`)
      res.status(404).send()
    })
}

const updateUserController = async (req: Request, res: Response) => {
  try {
    if (Object.keys(req.body).length === 0) {
      logger.error('updateUserController: no data provided')
      res.status(400).send()
      return
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const data: userPutRequest = await userPutReqValidator.parseAsync({
      ...req.body,
      password: hashedPassword,
    })
    userService
      .updateUser(data, res.locals.username)
      .then(() => {
        logger.info('user updated successfully')
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

export const userController = {
  createUserController,
  getUserController,
  updateUserController,
}
