import 'dotenv/config';

import * as configInterface from './interface';

const {env} = process;

export const appConfig: configInterface.AppConfig = {
  serverHost: env.APP_SERVER_HOST || 'http://localhost',
  port: env.APP_PORT || 8000,
  debug: env.APP_DEBUG || 'true',
  environment: env.APP_ENVIRONMENT || 'develop',
  prefix: env.APP_API_PREFIX || '',
};

export const postgresConfig: configInterface.PostgresConfig = {
  username: env.POSTGRES_USER || 'postgres',
  password: env.POSTGRES_PASSWORD || 'postgres',
  host: env.POSTGRES_HOST || 'postgres',
  port: env.POSTGRES_PORT || 5432,
  database: env.POSTGRES_DB || 'postgres',
};

export const mailerConfig: configInterface.MailerConfig = {
  verifyRoute: env.MAILER_VERIFY_ROUTE || '/verify',
  user: env.MAILER_USER || '',
  clientId: env.MAILER_CLIENTID || '',
  clientSecret: env.MAILER_CLIENTSECRET || '',
  refreshToken: env.MAILER_REFRESH_TOKEN || '',
  redirectUri: env.MAILER_REDIRECT_URI || '',
};
