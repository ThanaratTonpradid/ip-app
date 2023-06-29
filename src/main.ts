import { Logger } from '@dollarsign/logger';
import { GlobalExceptionFilter } from '@dollarsign/nestjs-exceptions';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { AppModule } from './modules/app/app.module';
import { AppConfig } from './configs';
import { ConfigName, ConstantName } from './constants';

const logger = new Logger('APP');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, swaggerUi, loggerConsole, sessionSecret } = configService.get<AppConfig>(
    ConfigName.APP,
  );
  const sessionOpt: session.SessionOptions = {
    name: ConstantName.SESSION_KEY,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  };
  app.enableCors();
  app.use(cookieParser());
  app.use(session(sessionOpt));
  app.useLogger(loggerConsole ? console : logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  if (swaggerUi) {
    const options = new DocumentBuilder()
      .setTitle('APP')
      .setDescription('What is Ip location app')
      .setVersion('0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();
  logger.verbose(`APP is listening on ${url}`);
  if (swaggerUi) {
    logger.verbose(`APP swagger endpoint ${url}/swagger`);
  }
}
(async (): Promise<void> => {
  await bootstrap();
})().catch((error: Error) => {
  logger.error(`APP error: ${error.message}`);
});
