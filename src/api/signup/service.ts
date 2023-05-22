import {NextFunction, Request, Response} from 'express';

import {response} from '../../util';
import {sessionModel} from '../session';
import * as signupModel from './model';
import * as signupInterface from './interface';
import {ApiResponse} from '../interface';

export const postSignup = async (
  req: Request<{}, {}, signupInterface.PostSignup>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {body} = req;
    const {id} = body;
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const exist = await signupModel.readSignupById(id);
    if (exist) {
      result.statusCode = 400;
      result.message = 'id is already exist';
      result.data = null;
      throw result;
    }
    const session = await sessionModel.readById(Number(body.sessionId));
    if (!session) {
      result.statusCode = 400;
      result.message = 'session not found';
      result.data = null;
      throw result;
    }
    const createSignupDto: signupInterface.CreateSignupDto = {
      id: body.id,
      name: body.name,
      email: body.email,
      phoneNumber: body.phoneNumber,
      joinNumber: body.joinNumber,
      isParking: body.isParking,
      isShuttle: body.isShuttle,
      session: session,
    };
    const signup = await signupModel.createSignup(createSignupDto);
    result.statusCode = 201;
    result.message = 'POST a signup success';
    result.data = signup;
    response(res, result);
  } catch (err) {
    next(err);
  }
};
