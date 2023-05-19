export interface ServiceConfig {
  port: string | number;
}

export interface AppConfig extends ServiceConfig {
  debug: string;
  environment: string;
}
