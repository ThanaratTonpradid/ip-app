import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IpModule } from '../ip/ip.module';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, owaTypeOrmConfig, redisConfig, jwtConfig } from '../../configs';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, owaTypeOrmConfig, redisConfig, jwtConfig],
    }),
    BootstrapModule,
    AuthModule,
    UserModule,
    IpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
