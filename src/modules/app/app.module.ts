import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig, owaTypeOrmConfig } from '../../configs';
import { IpModule } from '../ip/ip.module';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, owaTypeOrmConfig],
    }),
    BootstrapModule,
    IpModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
