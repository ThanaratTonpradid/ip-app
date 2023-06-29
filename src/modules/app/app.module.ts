import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  appConfig,
  owaTypeOrmConfig,
  redisConfig,
  jwtConfig,
} from '../../configs';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { AuthModule } from '../auth/auth.module';
import { IpModule } from '../ip/ip.module';
import { OwaDocumentModule } from '../owa-document/owa-document.module';
import { OwaHostModule } from '../owa-host/owa-host.module';
import { OwaOsModule } from '../owa-os/owa-os.module';
import { OwaSiteModule } from '../owa-site/owa-site.module';
import { OwaUaModule } from '../owa-ua/owa-ua.module';
import { OwaVisitorModule } from '../owa-visitor/owa-visitor.module';
import { OwaTrackerModule } from '../owa-tracker/owa-tracker.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, owaTypeOrmConfig, redisConfig, jwtConfig],
    }),
    BootstrapModule,
    AuthModule,
    IpModule,
    OwaDocumentModule,
    OwaHostModule,
    OwaOsModule,
    OwaSiteModule,
    OwaUaModule,
    OwaVisitorModule,
    OwaTrackerModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
