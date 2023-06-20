import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Logger } from '@dollarsign/logger';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { LoginDto, AccessTokenDto, JwtPayloadDto } from './dto';
import { JwtPayload } from './interfaces';
import { classTransformOptions } from './interfaces/class-transform.constant';
import { CurrentSession, JwtGuard } from './decorators';
import { BooleanResultDto, ExceptionResponseDto } from '../../dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @JwtGuard()
  @Get('session')
  session(@CurrentSession() jwtPayload: JwtPayload): JwtPayloadDto {
    return plainToClass(JwtPayloadDto, jwtPayload, classTransformOptions);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ type: ExceptionResponseDto })
  @ApiUnauthorizedResponse({ type: ExceptionResponseDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AccessTokenDto> {
    const login = await this.authService.login(loginDto);
    this.logger.warn(`login: ${JSON.stringify(login)}`);
    return login;
  }

  @HttpCode(HttpStatus.OK)
  @JwtGuard()
  @Post('logout')
  async logout(
    @CurrentSession() jwtPayload: JwtPayload,
  ): Promise<BooleanResultDto> {
    return this.authService.logout(jwtPayload);
  }
}
