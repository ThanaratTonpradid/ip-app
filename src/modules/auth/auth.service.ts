import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommonException } from '@dollarsign/nestjs-exceptions';
import { Logger } from '@dollarsign/logger';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { v4 as uuid } from 'uuid';
import { attempt } from 'lodash';
import { JwtPayload } from './interfaces';
import { DefaultMessage, ErrorCode } from '../../constants';
import { UserService } from '../user/user.service';
import { OwaUser } from '../../entities/owa_user.entity';
import { PasswordUtility } from '../../utils/password.util';
import { AccessTokenDto, LoginDto } from './dto';
import { BooleanResultDto } from '../../dto';
import { InjectRedisSession } from '../../decorators';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRedisSession()
    protected readonly redisSession: Redis,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createSessionKey(userId: number): string {
    const key = ['SESSION', userId || '*'];
    return key.join(':').toUpperCase();
  }

  async removeSession(key: string): Promise<boolean> {
    const res = await this.redisSession.del(key);
    return res === 1;
  }

  async createSession(userId: number): Promise<string> {
    const key = this.createSessionKey(userId);
    const hash = uuid().toUpperCase();
    const jwtPayload: JwtPayload = {
      key,
      hash,
      userId,
    };
    const sevenDays = 7 * 86400;
    await this.redisSession.set(
      key,
      JSON.stringify(jwtPayload),
      'EX',
      sevenDays,
    );
    return this.jwtService.sign(jwtPayload);
  }

  async getSession(key: string): Promise<JwtPayload> {
    const result = await this.redisSession.get(key);
    const jwtPayload = attempt<JwtPayload>(JSON.parse.bind(null, result));
    if (!jwtPayload) {
      throw new CommonException({
        code: ErrorCode.SESSION_EXPIRED,
        error: new UnauthorizedException(DefaultMessage.SESSION_EXPIRED),
      });
    }
    if (!('hash' in jwtPayload)) {
      throw new CommonException({
        code: ErrorCode.SESSION_EXPIRED,
        error: new UnauthorizedException(jwtPayload),
      });
    }
    return jwtPayload;
  }

  async validateJwtPayload(jwtPayload: JwtPayload): Promise<JwtPayload> {
    try {
      const session = await this.getSession(jwtPayload.key);
      if (jwtPayload.hash !== session.hash) {
        throw new CommonException({
          code: ErrorCode.SESSION_EXPIRED,
          error: new UnauthorizedException(DefaultMessage.SESSION_EXPIRED),
        });
      }
      return session;
    } catch (error) {
      throw error;
    }
  }

  async login(param: LoginDto): Promise<AccessTokenDto> {
    const { username, password } = param;
    let targetUser: OwaUser;
    try {
      targetUser = await this.userService.findOneByUsername(username);
    } catch (error) {
      targetUser = null;
      this.logger.warn(`Login failed`, error);
    }
    if (
      !targetUser ||
      !PasswordUtility.isValidPassword(password, targetUser.password)
    ) {
      throw new CommonException({
        code: ErrorCode.INVALID_CREDENTIALS,
        error: new UnauthorizedException('Invalid username or password'),
      });
    }
    const token = await this.createSession(targetUser.id);
    return new AccessTokenDto({
      token,
    });
  }

  async logout(jwtPayload: JwtPayload): Promise<BooleanResultDto> {
    const result = await this.removeSession(jwtPayload.key);
    return new BooleanResultDto({
      isSuccess: result,
    });
  }
}
