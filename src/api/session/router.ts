import {Router} from 'express';

import {
  deleteById,
  getAllSessions,
  getSessionById,
  patchSession,
  postSession,
} from './service';
import {sessionCheck} from '../../middleware/session/session';

export const sessionRouter = Router();

sessionRouter.route('/').get(getAllSessions).post(sessionCheck, postSession);
sessionRouter
  .route('/:sessionId')
  .get(getSessionById)
  .patch(sessionCheck, patchSession)
  .delete(sessionCheck, deleteById);
