import {Router} from 'express';

import {getAllSignup, postSignup} from './service';

export const signupRouter = Router();

signupRouter.route('/').get(getAllSignup).post(postSignup);
