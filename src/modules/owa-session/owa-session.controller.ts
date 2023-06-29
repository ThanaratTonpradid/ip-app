import { Controller, Get, Session } from '@nestjs/common';
import { OwaSessionService } from './owa-session.service';
import { CookieSession } from '../../decorators';
import { ConstantName } from '../../constants';

@Controller('owa-session')
export class OwaSessionController {
  constructor(private readonly owaSessionService: OwaSessionService) {}

  @Get()
  checkVisitSession(
    @CookieSession(ConstantName.SESSION_KEY)
    cookies: string | Record<string, any>,
    @Session() session: Record<string, any>,
  ): string {
    return this.owaSessionService.checkVisitSession({ cookies, session });
  }
}
