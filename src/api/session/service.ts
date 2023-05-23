import {NextFunction, Request, Response} from 'express';

import {response} from '../../util';
import * as sessionModel from './model';
import {ApiResponse} from '../interface';
import {SessionStatus} from './interface';
// import {SessionStatus} from './interface';

export const getAllSessions = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const sessions = await sessionModel.readAllWithSignup();
    const sesstionStatus: SessionStatus[] = sessions.map(session => {
      return {
        ...session,
        remainingNumber:
          session.joinLimit -
          session.signups.reduce((pre, cur) => pre + cur.joinNumber, 0),
      };
    });
    result.statusCode = 200;
    result.message = 'get all sessions success';
    result.data = sesstionStatus;
    response(res, result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getSessionById = async (
  req: Request<{sessionId: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {sessionId} = req.params;
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const session = await sessionModel.readById(sessionId);
    result.statusCode = 200;
    result.message = 'get a session by id';
    result.data = session;
    response(res, result);
  } catch (err) {
    next(err);
  }
};
