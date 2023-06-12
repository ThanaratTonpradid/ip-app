import { ConfigName } from 'src/constants';

import { registerAs } from '@nestjs/config';

import { isEnabled, isProduction } from './helper.config';

export interface AppConfig {
  authToken: string;
  isProduction: boolean;
  loggerConsole: boolean;
  port: number;
  swaggerUi: boolean;
}

export const appConfig = registerAs(
  ConfigName.APP,
  (): AppConfig => ({
    authToken: process.env.AUTH_TOKEN,
    isProduction: isProduction(process.env.NODE_ENV),
    loggerConsole: isEnabled(process.env.LOGGER_CONSOLE),
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    swaggerUi: isEnabled(process.env.SWAGGER_UI),
  }),
);
