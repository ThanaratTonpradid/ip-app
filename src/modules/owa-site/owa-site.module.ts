import { Module } from '@nestjs/common';
import { OwaSiteController } from './owa-site.controller';
import { OwaSiteService } from './owa-site.service';
import { OwaSite } from '../../entities/owa_site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionName } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([OwaSite], ConnectionName.OWA)],
  controllers: [OwaSiteController],
  providers: [OwaSiteService],
})
export class OwaSiteModule {}
