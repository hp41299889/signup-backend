import {Router} from 'express';

import {postSignup} from './service';

export const signupRouter = Router();

signupRouter.route('/').post(postSignup);
