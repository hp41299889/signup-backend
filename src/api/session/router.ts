import {Router} from 'express';

import {
  deleteById,
  getAllSessions,
  getSessionById,
  patchSession,
  postSession,
} from './service';

export const sessionRouter = Router();

sessionRouter.route('/').get(getAllSessions).post(postSession);
sessionRouter
  .route('/:sessionId')
  .get(getSessionById)
  .patch(patchSession)
  .delete(deleteById);
