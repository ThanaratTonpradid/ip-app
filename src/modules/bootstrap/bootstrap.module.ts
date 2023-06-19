import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionName, TypeOrmConfigName } from '../../constants';
import { RedisModule } from '../redis/redis.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: ConnectionName.OWA,
      useFactory: (config: ConfigService) => {
        return config.get<TypeOrmModuleOptions>(TypeOrmConfigName.OWA);
      },
      inject: [ConfigService],
    }),
    RedisModule.registerRedisSession(),
  ],
  exports: [RedisModule],
})
export class BootstrapModule {}
