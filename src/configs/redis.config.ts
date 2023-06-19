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
    url: process.env.REDIS_SESSION_URL,
    onClientReady: eventHandler(RedisName.SESSION),
  },
]);
