import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisName } from '../../configs';
import {} from '../../constants';
import { RedisModuleOptions } from 'nestjs-redis';

@Module({})
export class RedisModule {
  static registerRedisSession(): DynamicModule {
    const RedisSessionProvider = {
      provide: RedisName.SESSION,
      useFactory: (config: ConfigService): Redis => {
        const redisConfigs = config.get<RedisModuleOptions[]>('redis');
        const redisOptions = redisConfigs.find(
          (i: RedisModuleOptions) => i.name === RedisName.SESSION,
        );
        const redis = new Redis(redisOptions);
        return redis;
      },
      inject: [ConfigService],
    };
    return {
      module: RedisModule,
      providers: [RedisSessionProvider],
      exports: [RedisSessionProvider],
    };
  }

  static registerRedisData(): DynamicModule {
    const RedisSessionProvider = {
      provide: RedisName.DATA,
      useFactory: (config: ConfigService): Redis => {
        const redisConfigs = config.get<RedisModuleOptions[]>('redis');
        const redisOptions = redisConfigs.find(
          (i: RedisModuleOptions) => i.name === RedisName.DATA,
        );
        const redis = new Redis(redisOptions);
        return redis;
      },
      inject: [ConfigService],
    };
    return {
      module: RedisModule,
      providers: [RedisSessionProvider],
      exports: [RedisSessionProvider],
    };
  }
}
