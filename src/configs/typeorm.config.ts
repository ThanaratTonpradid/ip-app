import { TypeOrmConfigName } from 'src/constants';

import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { StringUtility } from '../utils/string.util';

type DatabaseType = 'mysql' | 'mariadb';

export const owaTypeOrmConfig = registerAs(
  TypeOrmConfigName.OWA,
  (): TypeOrmModuleOptions => ({
    type: process.env.DB_OWA_TYPE as DatabaseType,
    host: process.env.DB_OWA_HOST,
    port: Number(process.env.DB_OWA_PORT),
    username: process.env.DB_OWA_USERNAME,
    password: process.env.DB_OWA_PASSWORD,
    database: process.env.DB_OWA_DATABASE,
    logging: StringUtility.isEnabled(process.env.DB_OWA_LOGGING),
    synchronize: StringUtility.isEnabled(process.env.DB_OWA_SYNC),
    timezone: '+07:00',
    entities: ['**/entities/*.js'],
    ssl: StringUtility.isEnabled(process.env.DB_OWA_SSL)
      ? { rejectUnauthorized: false }
      : false,
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  }),
);
