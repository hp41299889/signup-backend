import {Response} from 'express';
import {ApiResponse} from '../api/interface';

export const response = (res: Response, result: ApiResponse) => {
  const {statusCode, message, data} = result;
  res.status(statusCode).json({
    status: 'success',
    message: message,
    data: data,
  });
};
