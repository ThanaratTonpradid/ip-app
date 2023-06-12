import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ExceptionResponseDto } from 'src/dto';
import { VerifyTokenDto } from './dto/verify-token.dto';

import { TokenAuthGuard } from './guards';
import { TokenType } from './interfaces';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ type: ExceptionResponseDto })
  @UseGuards(TokenAuthGuard)
  @Get('verify/token')
  verifyAuthToken(): VerifyTokenDto {
    return new VerifyTokenDto({
      active: true,
      type: TokenType.STATIC,
    });
  }
}
