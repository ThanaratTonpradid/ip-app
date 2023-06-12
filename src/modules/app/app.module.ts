import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appConfig } from '../../configs';
import { IpModule } from '../ip/ip.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig],
    }),
    IpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
