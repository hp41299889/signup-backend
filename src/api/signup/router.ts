import {Router} from 'express';

import {
  deleteSignup,
  getAllSignup,
  getCheckinById,
  patchCheckinById,
  postSignup,
} from './service';

export const signupRouter = Router();

signupRouter.route('/').get(getAllSignup).post(postSignup);
signupRouter
  .route('/:id')
  .get(getCheckinById)
  .patch(patchCheckinById)
  .delete(deleteSignup);
