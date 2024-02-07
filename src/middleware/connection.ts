import { Request, Response, NextFunction } from 'express'
import { db } from '../util/db'
import logger from '../util/logger'

export const checkDBConection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.authenticate()
    .then(async () => {
      logger.info('Connection has been established successfully.')
      next()
    })
    .catch(() => {
      logger.error(`database connection failed`)
      res.status(503).send()
      return
    })
}
