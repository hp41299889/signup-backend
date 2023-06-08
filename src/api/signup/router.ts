import {Router} from 'express';

import {
  deleteSignup,
  getAllSignup,
  getCheckinById,
  patchCheckinById,
  postSignup,
} from './service';
import {sessionCheck} from '../../middleware/session/session';

export const signupRouter = Router();

signupRouter.route('/').get(sessionCheck, getAllSignup).post(postSignup);
signupRouter
  .route('/:id')
  .get(getCheckinById)
  .patch(patchCheckinById)
  .delete(deleteSignup);
