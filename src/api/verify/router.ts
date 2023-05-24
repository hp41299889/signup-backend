import {Router} from 'express';

import {getVerify} from './service';

export const verifyRouter = Router();

verifyRouter.route('/:id').get(getVerify);
