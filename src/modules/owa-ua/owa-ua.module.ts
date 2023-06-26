import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwaUaService } from './owa-ua.service';
import { OwaUaController } from './owa-ua.controller';
import { ConnectionName } from '../../constants';
import { OwaUa } from '../../entities/owa_ua.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OwaUa], ConnectionName.OWA)],
  providers: [OwaUaService],
  controllers: [OwaUaController]
})
export class OwaUaModule {}
