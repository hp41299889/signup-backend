import {authRouter} from './auth';
import {Routers} from './interface';
import {sessionRouter} from './session';
import {signupRouter} from './signup';
import {verifyRouter} from './verify';

export const routers: Routers = {
  session: sessionRouter,
  signup: signupRouter,
  verify: verifyRouter,
  auth: authRouter,
};
