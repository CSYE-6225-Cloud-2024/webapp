import { Request, Response, NextFunction } from 'express'
import logger from '../util/logger'

const isValidContentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contentType =
    req.headers['content-type']?.toLowerCase() || 'application/json'
  if (contentType !== 'application/json') {
    logger.warn({
      message: 'invalid content',
      contentType: contentType,
    })
    res.status(400).json()
    return
  }

  next()
}

const noQueryAllowed = (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.query).length > 0) {
    logger.warn({
      message: 'no query parameters are allowed for this endpoint',
    })
    res.status(400).json()
    return
  }

  next()
}

const noBodyAllowed = (req: Request, res: Response, next: NextFunction) => {
  if ('content-length' in req.headers) {
    logger.warn({
      message: 'no body is allowed for this endpoint',
    })
    res.status(400).json()
    return
  }

  next()
}

export const request = {
  isValidContentType,
  noQueryAllowed,
  noBodyAllowed,
}
