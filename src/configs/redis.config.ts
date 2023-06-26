import { Logger } from '@dollarsign/logger';
import { registerAs } from '@nestjs/config';
import { Redis } from 'ioredis';
import { RedisModuleOptions } from 'nestjs-redis';

const logger = new Logger({ name: 'RedisConfig' });

export enum RedisName {
  SESSION = 'REDIS_SESSION',
}

function eventHandler(name: string) {
  return async (client: Redis): Promise<void> => {
    client.on('error', (err: Error) => {
      logger.error(`Redis[${name}] error: ${err.message}`);
    });
    client.on('ready', () => {
      logger.log(`Redis[${name}] ready`);
    });
    await Promise.resolve();
  };
}

export const redisConfig = registerAs('redis', (): RedisModuleOptions[] => [
  {
    name: RedisName.SESSION,
    host: process.env.REDIS_SESSION_HOST,
    port: parseInt(process.env.REDIS_SESSION_PORT, 10) || 6379,
    username: process.env.REDIS_SESSION_USERNAME,
    password: process.env.REDIS_SESSION_PASSWORD,
    db: parseInt(process.env.REDIS_SESSION_DB, 10) || 0,
    onClientReady: eventHandler(RedisName.SESSION),
  },
]);
