import {NextFunction, Request, Response} from 'express';

import {response} from '../../util';
import * as sessionModel from './model';
import {ApiResponse} from '../interface';
import {
  PatchSession,
  SessionStatus,
  UpdateSessionDto,
  PostSession,
  CreateSessionDto,
} from './interface';

export const postSession = async (
  req: Request<{}, {}, PostSession>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {body} = req;
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const createSessionDto: CreateSessionDto = {
      name: body.name,
      place: body.place,
      joinLimit: body.joinLimit,
      isParking: body.isParking,
      isShuttle: body.isShuttle,
    };
    const created = await sessionModel.createSession(createSessionDto);
    result.statusCode = 201;
    result.message = 'post session success';
    result.data = created;
    response(res, result);
  } catch (err) {
    next(err);
  }
};

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

export const patchSession = async (
  req: Request<{sessionId: string}, {}, PatchSession>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {body} = req;
    const {sessionId} = req.params;
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const updateSessionDto: UpdateSessionDto = {
      name: body.name,
      place: body.place,
      joinLimit: body.joinLimit,
      isParking: body.isParking,
      isShuttle: body.isShuttle,
    };
    const updated = await sessionModel.updateById(
      Number(sessionId),
      updateSessionDto
    );
    result.statusCode = 200;
    result.message = 'update success';
    result.data = updated;
    response(res, result);
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (
  req: Request<{sessionId: string}, {}>,
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
    const deleted = await sessionModel.deleteById(Number(sessionId));
    result.statusCode = 200;
    result.message = 'delete success';
    result.data = deleted;
    response(res, result);
  } catch (err) {
    next(err);
  }
};
