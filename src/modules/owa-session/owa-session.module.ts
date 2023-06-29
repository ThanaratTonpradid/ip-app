import { Module } from '@nestjs/common';
import { OwaSessionController } from './owa-session.controller';
import { OwaSessionService } from './owa-session.service';

@Module({
  providers: [OwaSessionService],
  controllers: [OwaSessionController],
})
export class OwaSessionModule {}
