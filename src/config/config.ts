import 'dotenv/config';

import * as configInterface from './interface';

const {env} = process;

export const appConfig: configInterface.AppConfig = {
  port: env.APP_PORT || 8000,
  debug: env.APP_DEBUG || 'true',
  environment: env.APP_ENVIRONMENT || 'develop',
};
