import {Router} from 'express';

import {getAllSessions, getSessionById} from './service';

export const sessionRouter = Router();

sessionRouter.route('/').get(getAllSessions);
sessionRouter.route('/:sessionId').get(getSessionById);
