import {NextFunction, Request, Response} from 'express';
import {createHash} from 'crypto';

import {response} from '../../util';
import {sessionModel} from '../session';
import * as signupModel from './model';
import * as signupInterface from './interface';
import {ApiResponse} from '../interface';
import {sendMail} from '../../job/mail';
import {MailOption} from '../../job/mail/interface';
import {verifyState} from '../verify';
import {appConfig, mailerConfig} from '../../config/config';

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
      isVerified: false,
      session: session,
    };
    const signup = await signupModel.createSignup(createSignupDto);
    const nowTime = new Date().getTime();
    const hash = createHash('sha256')
      .update(id + nowTime.toString())
      .digest('hex');
    verifyState[id] = {
      hash: hash,
      life: nowTime + 3600 * 1000,
    };
    const mailOption: MailOption = {
      from: mailerConfig.user,
      to: body.email,
      subject: '報名表單驗證',
      html: `
      <p>請點擊以下連結驗證</p></br>
      <a href="${appConfig.serverHost}/${mailerConfig.verifyRoute}/${id}?hash=${hash}">點擊以驗證</a>
      `,
    };
    await sendMail(mailOption);
    result.statusCode = 201;
    result.message = 'POST a signup success';
    result.data = signup;
    response(res, result);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
