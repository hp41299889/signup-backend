import {Router} from 'express';

import {
  getAllSignup,
  getCheckinById,
  patchCheckinById,
  postSignup,
} from './service';

export const signupRouter = Router();

signupRouter.route('/').get(getAllSignup).post(postSignup);
signupRouter.route('/:id').get(getCheckinById).patch(patchCheckinById);
