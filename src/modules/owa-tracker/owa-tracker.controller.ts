import { Controller, Get, Param, Session } from '@nestjs/common';
import { OwaTrackerService } from './owa-tracker.service';
import { CookieSession } from '../../decorators';
import { ConstantName } from '../../constants';

@Controller('owa-tracker')
export class OwaTrackerController {
  constructor(private readonly owaTrackerService: OwaTrackerService) {}

  @Get(':siteId')
  getTracker(
    @CookieSession(ConstantName.SESSION_KEY)
    cookies: string | Record<string, any>,
    @Session() session: Record<string, any>,
    @Param('siteId') siteId: string,
  ): string {
    return this.owaTrackerService.getTracker({ cookies, session, siteId });
  }
}
