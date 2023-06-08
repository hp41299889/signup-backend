import {Request, Response, NextFunction} from 'express';
import {ApiResponse} from '../../api/interface';

export const sessionCheck = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user === 'mega') {
    next();
  } else {
    const err: ApiResponse = {
      statusCode: 401,
      message: 'no session',
      data: 'Auth failed',
    };
    throw next(err);
  }
};
