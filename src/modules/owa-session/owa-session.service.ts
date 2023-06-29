import { Injectable } from '@nestjs/common';
import { Logger } from '@dollarsign/logger';
import { SessionInfoPayload } from '../../interfaces';

@Injectable()
export class OwaSessionService {
  public readonly logger = new Logger(OwaSessionService.name);

  checkVisitSession(sessionPayload: SessionInfoPayload): string {
    const { cookies, session } = sessionPayload;
    this.logger.debug({ cookies, 'session.views': session['views'] });
    return '';
  }
}
