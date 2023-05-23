import {Router} from 'express';

import {getVerify, getGoogleCode} from './service';

export const verifyRouter = Router();

verifyRouter.route('/:id').get(getVerify);
verifyRouter.route('/auth').get(getGoogleCode);
