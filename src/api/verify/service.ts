import {NextFunction, Request, Response} from 'express';

import {ApiResponse} from '../interface';
import {verifyState} from './state';
import {response} from '../../util';

export const getVerify = async (
  req: Request<{id: string}, {}, {}, {hash: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const {hash} = req.query;
    const nowTime = new Date().getTime();
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    if (!verifyState[id]) {
      result.statusCode = 400;
      result.message = 'verify id not found';
      result.data = null;
      throw result;
    }
    if (verifyState[id].life < nowTime) {
      result.statusCode = 400;
      result.message = 'verify life expired';
      result.data = null;
      throw result;
    }
    if (verifyState[id].hash !== hash) {
      result.statusCode = 400;
      result.message = 'verify hash incorrect';
      result.data = null;
      throw result;
    }
    result.statusCode = 200;
    result.message = 'verify success';
    result.data = verifyState[id];
    response(res, result);
  } catch (err) {
    next(err);
  }
};

export const getGoogleCode = async (
  req: Request<{}, {}, {}, {code: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {code} = req.query;
    const result: ApiResponse = {
      statusCode: 200,
      message: 'get google code',
      data: code,
    };
    response(res, result);
  } catch (err) {
    next(err);
  }
};
