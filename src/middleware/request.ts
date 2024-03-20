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
    res.status(400).send()
    logger.warn({
      message: 'invalid content',
      contentType: contentType,
    })
    return
  }

  next()
}

const noQueryAllowed = (req: Request, res: Response, next: NextFunction) => {
  if (Object.keys(req.query).length > 0) {
    res.status(400).send()
    logger.warn({
      message: 'no query parameters are allowed for this endpoint',
    })
    return
  }

  next()
}

const noBodyAllowed = (req: Request, res: Response, next: NextFunction) => {
  if ('content-length' in req.headers) {
    res.status(400).send()
    logger.warn({
      message: 'no body is allowed for this endpoint',
    })
    return
  }

  next()
}

export const request = {
  isValidContentType,
  noQueryAllowed,
  noBodyAllowed,
}
