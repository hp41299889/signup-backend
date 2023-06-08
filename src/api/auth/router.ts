import {Router} from 'express';

import {getLogout, getUser, postLogin} from './service';
import {sessionCheck} from '../../middleware/session/session';

export const authRouter = Router();

authRouter.route('/').post(postLogin).get(getLogout);
authRouter.route('/user').get(sessionCheck, getUser);
