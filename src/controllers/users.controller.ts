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
    const response: userResponse = await userService.createUser(data)
    logger.info(`created user with username: ${response.username}`)
    res.status(201).send(response)
  } catch (error) {
    res.status(400).send()
  }
}

const getUserController = async (req: Request, res: Response) => {
  if ('content-length' in req.headers || Object.keys(req.query).length > 0) {
    res.status(400).send()
    logger.warn(
      'user/self: request body or query params is not allowed for this endpoint'
    )
    return
  }

  try {
    const user: userResponse = await userService.getUser(res.locals.username)
    logger.info(`found user with username: ${user.username}`)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send()
  }
}

const updateUserController = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const data: userPutRequest = await userPutReqValidator.parseAsync({
      ...req.body,
      password: hashedPassword,
    })
    await userService.updateUser(data, res.locals.username)
    logger.info('user updated successfully')
    res.status(204).send()
  } catch (error) {
    res.status(400).send()
  }
}

export const userController = {
  createUserController,
  getUserController,
  updateUserController,
}
