import 'dotenv/config';

import * as configInterface from './interface';

const {env} = process;

export const appConfig: configInterface.AppConfig = {
  port: env.APP_PORT || 8000,
  debug: env.APP_DEBUG || 'true',
  environment: env.APP_ENVIRONMENT || 'develop',
};

export const postgresConfig: configInterface.PostgresConfig = {
  username: env.HUIHUI_POSTGRES_USER || 'postgres',
  password: env.HUIHUI_POSTGRES_PASSWORD || 'postgres',
  host: env.HUIHUI_POSTGRES_HOST || 'localhost',
  port: env.HUIHUI_POSTGRES_PORT || 5432,
  database: env.HUIHUI_POSTGRES_DB || 'postgres',
};
