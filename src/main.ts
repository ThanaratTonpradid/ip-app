import { Logger } from '@dollarsign/logger';
import { GlobalExceptionFilter } from '@dollarsign/nestjs-exceptions';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './configs';
import { ConfigName } from './constants';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('APP');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port, swaggerUi, loggerConsole } = configService.get<AppConfig>(
    ConfigName.APP,
  );
  app.enableCors();
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
