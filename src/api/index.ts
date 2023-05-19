import {Routers} from './interface';
import {sessionRouter} from './session';
import {signupRouter} from './signup';

export const routers: Routers = {
  session: sessionRouter,
  signup: signupRouter,
};
