export interface ServiceConfig {
  port: string | number;
}

export interface AppConfig extends ServiceConfig {
  debug: string;
  environment: string;
}

export interface PostgresConfig extends ServiceConfig {
  username: string;
  password: string;
  host: string;
  database: string;
}

export interface MailerConfig {
  verifyRoute: string;
  user: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}
