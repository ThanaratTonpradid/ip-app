import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwaHostController } from './owa-host.controller';
import { OwaHostService } from './owa-host.service';
import { OwaHost } from '../../entities/owa_host.entity';
import { ConnectionName } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([OwaHost], ConnectionName.OWA)],
  controllers: [OwaHostController],
  providers: [OwaHostService],
})
export class OwaSiteModule {}
