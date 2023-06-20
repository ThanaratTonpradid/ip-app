import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../modules/auth/guards';
import { ExceptionResponseDto } from '../dto';

export function JwtGuard(): MethodDecorator {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ type: ExceptionResponseDto }),
    UseGuards(JwtAuthGuard),
  );
}
