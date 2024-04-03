import { Router, Request, Response } from 'express'
import logger from '../util/logger'

const notfoundRouter = Router()

notfoundRouter.all('*', (req: Request, res: Response) => {
  logger.error(`404 Not Found: ${req.method} ${req.originalUrl}`)
  res.status(404).json()
})

export default notfoundRouter
