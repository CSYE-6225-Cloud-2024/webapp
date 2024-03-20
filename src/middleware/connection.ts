import { Request, Response, NextFunction } from 'express'
import { db } from '../util/db'
import logger from '../util/logger'

export const checkDBConection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.authenticate()
    logger.debug('Database connection OK')
    next()
  } catch (err) {
    logger.error(`Unable to connect to the database: ${err}`)
    res.status(500).send()
    return
  }
}
