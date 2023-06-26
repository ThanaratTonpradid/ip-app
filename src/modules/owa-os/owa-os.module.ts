import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwaOsController } from './owa-os.controller';
import { OwaOsService } from './owa-os.service';
import { OwaOs } from '../../entities/owa_os.entity';
import { ConnectionName } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([OwaOs], ConnectionName.OWA)],
  controllers: [OwaOsController],
  providers: [OwaOsService],
})
export class OwaOsModule {}
