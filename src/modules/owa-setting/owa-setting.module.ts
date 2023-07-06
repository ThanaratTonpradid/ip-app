import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwaSettingController } from './owa-setting.controller';
import { OwaSettingService } from './owa-setting.service';
import { OwaSetting } from '../../entities/owa_setting.entity';
import { ConnectionName } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([OwaSetting], ConnectionName.OWA)],
  controllers: [OwaSettingController],
  providers: [OwaSettingService],
})
export class OwaSettingModule {}
