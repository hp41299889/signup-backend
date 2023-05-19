import {Request, Response, NextFunction} from 'express';

import {loggerFactory} from '../../util';
import {ApiResponse} from '../../api/interface';

const logger = loggerFactory('Middleware error handler');

export const errorHandler = (
  err: ApiResponse,
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  logger.debug('error occur');
  const {statusCode, message, data} = err;
  res.status(statusCode).json({
    status: 'failed',
    message: message,
    data: data,
  });
  next();
};
