import { Injectable } from '@nestjs/common';
import { Logger } from '@dollarsign/logger';
import { SessionInfoPayload } from '../../interfaces';

@Injectable()
export class OwaTrackerService {
  public readonly logger = new Logger(OwaTrackerService.name);

  getTracker(sessionPayload: SessionInfoPayload): string {
    const { cookies, session } = sessionPayload;
    this.logger.debug({ cookies, 'session.views': session['views'] });
    return '';
  }
}
