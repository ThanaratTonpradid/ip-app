import { Request } from 'express';
import { AppConfig } from 'src/configs/app.config';

import { CommonException } from '@dollarsign/nestjs-exceptions';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigName, DefaultMessage, ErrorCode } from '../../../constants';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const { authToken } = this.configService.get<AppConfig>(ConfigName.APP);
    const { authorization } = request.headers;
    const isValidToken = `Bearer ${authToken}` === authorization;
    if (!isValidToken) {
      throw new CommonException({
        code: ErrorCode.INVALID_TOKEN,
        error: new UnauthorizedException(DefaultMessage.INVALID_TOKEN),
      });
    }
    return isValidToken;
  }
}
