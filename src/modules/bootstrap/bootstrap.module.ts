import { ConnectionName, TypeOrmConfigName } from 'src/constants';

import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

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
  ],
})
export class BootstrapModule {}
