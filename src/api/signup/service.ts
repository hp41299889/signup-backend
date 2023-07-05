import {NextFunction, Request, Response} from 'express';
import {createHash} from 'crypto';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {response} from '../../util';
import {sessionModel} from '../session';
import * as signupModel from './model';
import * as signupInterface from './interface';
import {ApiResponse} from '../interface';
import {sendMail} from '../../job/mail';
import {MailOption} from '../../job/mail/interface';
import {verifyState} from '../verify';
import {mailerConfig} from '../../config/config';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getAllSignup = async (
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
    const signups = await signupModel.readAllSignup();
    result.statusCode = 200;
    result.message = 'read all signup success';
    result.data = signups;
    response(res, result);
  } catch (err) {
    next(err);
  }
};

export const getCheckinById = async (
  req: Request<{id: string}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const signup = await signupModel.readSignupById(id);
    if (signup) {
      result.statusCode = 200;
      result.message = 'read signup by id success';
      result.data = signup;
    } else {
      result.statusCode = 400;
      result.message = 'signup not found';
      result.data = null;
    }
    response(res, result);
  } catch (err) {
    next(err);
  }
};

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
      //信件驗證
      isVerified: true,
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
    const verifyString = `
    ${
      /*<p>請點擊以下連結驗證</p></br>
  <a href="${appConfig.serverHost}${mailerConfig.verifyRoute}/${id}?hash=${hash}">點擊以驗證</a>*/ ''
    }
    `;
    const mailOption: MailOption = {
      from: mailerConfig.user,
      to: body.email,
      subject: '兆豐銀行2023悠活家庭日報名表單及驗證',
      html: `
      <p>感謝您報名兆豐銀行2023悠活家庭日活動：</p>
      <p>姓名：${signup.name}</p>
      <p>兆豐銀行員工編號：${signup.id}</p>
      <p>場次：${signup.session.name}–${signup.session.place}  ${dayjs(
        signup.session.activityDate
      )
        .utc(true)
        .tz(dayjs.tz.guess())
        .format('YYYY-MM-DD HH:mm:ss')}</p>
      <p>停車資訊：${signup.isParking ? '是' : '否'}</p>
      <p>接駁車資訊：${signup.isShuttle ? '是' : '否'}</p>
      <p>報名人數：${signup.joinNumber}</p>
      ${verifyString}
      ${
        session.name !== '桃竹場'
          ? ''
          : '</br><p>本場次開放預訂免費帳篷營位42帳及自費蒙古包34包</p><a href="">點我看說明</a>'
      }
      `,
    };
    sendMail(mailOption);
    result.statusCode = 201;
    result.message = 'POST a signup success';
    result.data = signup;
    response(res, result);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const patchCheckinById = async (
  req: Request<{id: string}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const checkined = await signupModel.updateSignupToCheckinById(id);
    result.statusCode = 200;
    result.message = 'update checkin success';
    result.data = checkined;
    response(res, result);
  } catch (err) {
    next(err);
  }
};

export const deleteSignup = async (
  req: Request<{id: string}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const deleted = await signupModel.deleteSignupById(id);
    result.statusCode = 200;
    result.message = 'delete signup success';
    result.data = deleted;
    response(res, result);
  } catch (err) {
    next(err);
  }
};
