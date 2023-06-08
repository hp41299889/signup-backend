import {NextFunction, Request, Response} from 'express';
import {response} from '../../util';
import {appConfig} from '../../config/config';
import {ApiResponse} from '../interface';

declare module 'express-session' {
  export interface SessionData {
    user: string;
  }
}

export const postLogin = async (
  req: Request<{}, {}, {username: string; password: string}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {username, password} = req.body;
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    if (username !== appConfig.username) {
      result.statusCode = 401;
      result.message = 'username incorrect';
      result.data = 'Login failed';
      throw result;
    } else if (password !== appConfig.password) {
      result.statusCode = 401;
      result.message = 'password incorrect';
      result.data = 'Login failed';
      throw result;
    } else {
      result.statusCode = 200;
      result.message = 'login success';
      result.data = 'Login success';
      req.session.user = username;
      response(res, result);
    }
  } catch (err) {
    next(err);
  }
};

export const getLogout = async (
  req: Request<{}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    req.session.destroy(() => {
      result.statusCode = 200;
      result.data = 'Logout success';
      result.message = 'logout';
      response(res, result);
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request<{}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    result.statusCode = 200;
    result.message = 'get user success';
    result.data = 'mega';
    response(res, result);
  } catch (err) {
    next(err);
  }
};
