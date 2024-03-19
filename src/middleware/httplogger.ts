import { Request, Response, NextFunction } from 'express';
import logger from '../util/logger';

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    message: 'HTTP Request',
    method: req.method,
    path: req.path,
  })
  next();
}