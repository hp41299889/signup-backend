import {Express} from 'express';

import * as middleware from '../middleware';
import {routers} from '../api';

export const registerRouter = async (app: Express): Promise<void> => {
  Object.entries(routers).forEach(([route, router]) => {
    app.use(`/${route}`, router);
  });
};

export const registerMiddleWare = async (app: Express): Promise<void> => {
  app.use(middleware.httpMiddleware.errorHandler);
};
