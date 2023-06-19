import { CommonException } from '@dollarsign/nestjs-exceptions';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ErrorCode, DefaultMessage } from '../../../constants';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<T extends JwtPayload>(error: Error, jwtPayload: T): T {
    if (error || !jwtPayload) {
      throw (
        error ||
        new CommonException({
          code: ErrorCode.INVALID_TOKEN,
          error: new UnauthorizedException(DefaultMessage.INVALID_TOKEN),
        })
      );
    }
    const { exp } = jwtPayload;
    const expiresIn = exp > 0 ? { expiresIn: new Date(exp * 1000) } : {};
    return { ...jwtPayload, ...expiresIn };
  }
}
