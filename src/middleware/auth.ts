import { Request, Response, NextFunction } from 'express'
import { userService } from '../services/user.service'
import logger from '../util/logger'

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).json()
  }
  const [username, password] = Buffer.from(token.split(' ')[1], 'base64')
    .toString('utf-8')
    .split(':')

  const auth = await userService.getAuth(username, password)

  if (auth) {
    res.locals.username = username
    next()
  } else {
    logger.warn(`Auth: invalid credentials for ${username}`)
    res.status(401).json()
  }
}

export const isVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const verified = await userService.getVerification(res.locals.username)
  if (verified) {
    next()
  } else {
    logger.warn(`isVerified: user ${res.locals.username} not verified`)
    res.status(403).json()
  }
}
