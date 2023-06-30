import {DataSource} from 'typeorm';

import {postgresConfig, appConfig} from '../../config/config';
import {entities} from '../../api/entities';
import {Migration1688114419983} from '../migration/1688114419983-migration';

export const postgres = new DataSource({
  type: 'postgres',
  host: postgresConfig.host,
  port: Number(postgresConfig.port),
  username: postgresConfig.username,
  password: postgresConfig.password,
  database: postgresConfig.database,
  entities: entities,
  migrations: [Migration1688114419983],
  migrationsTableName: 'migrations',
  synchronize: appConfig.debug === 'true' ? true : false,
});
