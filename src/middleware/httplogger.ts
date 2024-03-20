import { Request, Response, NextFunction } from 'express';
import logger from '../util/logger';

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.path}`)
  next();
}