import { Request } from 'express';
import { AppConfig } from 'src/configs/app.config';

import { CommonException } from '@dollarsign/nestjs-exceptions';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigName, DefaultMessage, ErrorCode } from '../../../constants';
import { ApiKey } from '../interfaces';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request<unknown, unknown, ApiKey>>();
    const { authToken } = this.configService.get<AppConfig>(ConfigName.APP);
    const { query, body, method } = request;
    const apiKey = method === 'GET' ? query.apiKey : body.apiKey;
    const isValidApiKey = `${authToken}` === `${apiKey.toString()}`;
    if (!isValidApiKey) {
      throw new CommonException({
        code: ErrorCode.INVALID_API_KEY,
        error: new UnauthorizedException(DefaultMessage.INVALID_API_KEY),
      });
    }
    return isValidApiKey;
  }
}
