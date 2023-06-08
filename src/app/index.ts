import express, {Express} from 'express';
import cors from 'cors';

import {appConfig} from '../config/config';
import * as register from './register';

export const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

const appInit = async (app: Express): Promise<void> => {
  await register.registerSession(app);
  await register.registerRouter(app);
  await register.registerMiddleWare(app);
  await register.registerDatabase();
  app.listen(appConfig.port, () => {
    console.log('app is running on port', appConfig.port);
  });
};

appInit(app);
