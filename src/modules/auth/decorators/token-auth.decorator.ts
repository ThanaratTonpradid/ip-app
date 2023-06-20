import { ExceptionResponseDto } from 'src/dto/exception.dto';

import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { TokenAuthGuard } from '../guards';

export function TokenAuth(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(TokenAuthGuard),
    ApiUnauthorizedResponse({ type: ExceptionResponseDto }),
    ApiBadRequestResponse({ type: ExceptionResponseDto }),
  );
}
