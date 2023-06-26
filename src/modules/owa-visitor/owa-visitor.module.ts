import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwaVisitorController } from './owa-visitor.controller';
import { OwaVisitorService } from './owa-visitor.service';
import { OwaVisitor } from '../../entities/owa_visitor.entity';
import { ConnectionName } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([OwaVisitor], ConnectionName.OWA)],
  controllers: [OwaVisitorController],
  providers: [OwaVisitorService],
})
export class OwaVisitorModule {}
