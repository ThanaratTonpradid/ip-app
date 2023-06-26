import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwaDocumentController } from './owa-document.controller';
import { OwaDocumentService } from './owa-document.service';
import { OwaDocument } from '../../entities/owa_document.entity';
import { ConnectionName } from '../../constants';

@Module({
  imports: [TypeOrmModule.forFeature([OwaDocument], ConnectionName.OWA)],
  controllers: [OwaDocumentController],
  providers: [OwaDocumentService],
})
export class OwaDocumentModule {}
