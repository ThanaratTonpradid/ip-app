import { Module } from '@nestjs/common';
import { OwaTrackerController } from './owa-tracker.controller';
import { OwaTrackerService } from './owa-tracker.service';
import { OwaSiteModule } from '../owa-site/owa-site.module';
import { OwaSettingModule } from '../owa-setting/owa-setting.module';

@Module({
  imports: [OwaSiteModule, OwaSettingModule],
  providers: [OwaTrackerService],
  controllers: [OwaTrackerController],
})
export class OwaTrackerModule {}
