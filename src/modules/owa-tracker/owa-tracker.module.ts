import { Module } from '@nestjs/common';
import { OwaTrackerController } from './owa-tracker.controller';
import { OwaTrackerService } from './owa-tracker.service';

@Module({
  providers: [OwaTrackerService],
  controllers: [OwaTrackerController],
})
export class OwaTrackerModule {}
