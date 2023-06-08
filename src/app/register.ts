import {Express} from 'express';
import session from 'express-session';

import * as middleware from '../middleware';
import {appConfig} from '../config/config';
import {routers} from '../api';
import {postgres, seedSession} from '../database';

export const registerRouter = async (app: Express): Promise<void> => {
  Object.entries(routers).forEach(([route, router]) => {
    app.use(`${appConfig.prefix}/${route}`, router);
  });
};

export const registerMiddleWare = async (app: Express): Promise<void> => {
  app.use(middleware.httpMiddleware.errorHandler);
};

export const registerDatabase = async (): Promise<void> => {
  await postgres
    .initialize()
    .then(() => {
      console.log('postgres initialize success');
    })
    .then(async () => {
      await seedSession();
    })
    .catch((err: Error) => {
      console.error(err);
    });
};

export const registerSession = async (app: Express) => {
  app.use(
    session({
      secret: appConfig.sessionKey,
      saveUninitialized: false,
      resave: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 4,
      },
    })
  );
};
