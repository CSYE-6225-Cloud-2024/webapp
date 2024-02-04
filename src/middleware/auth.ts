import { Request, Response, NextFunction } from 'express'
import { userService } from '../services/user.service'

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']
  if (!token) {
    return res.status(401).send()
  }
  const [username, password] = Buffer.from(token.split(' ')[1], 'base64')
    .toString('utf-8')
    .split(':')

  const auth = await userService.getAuth(username, password)

  if (auth) {
    res.locals.username = username
    next()
  } else {
    res.status(401).send()
  }
}

export default isAuth
