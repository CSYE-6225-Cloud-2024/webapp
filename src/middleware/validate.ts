import { Request, Response, NextFunction } from 'express'
import logger from '../util/logger'

export const isValidRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contentType =
    req.headers['content-type']?.toLowerCase() || 'application/json'
  if (contentType !== 'application/json') {
    res.status(400).send()
    logger.warn('invalid content type')
    return
  }

  next()
}
