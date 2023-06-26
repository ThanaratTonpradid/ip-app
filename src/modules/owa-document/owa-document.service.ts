import { Logger } from '@dollarsign/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OwaDocument } from '../../entities/owa_document.entity';
import { ConnectionName } from '../../constants';
import { DateTimeUtility } from '../../utils/date.util';
import { BooleanResultDto } from '../../dto';
import { CreateOwaDocumentDto, UpdateOwaDocumentDto } from './dto';

@Injectable()
export class OwaDocumentService {
  public readonly logger = new Logger(OwaDocumentService.name);
  constructor(
    @InjectRepository(OwaDocument, ConnectionName.OWA)
    private owaDocumentRepository: Repository<OwaDocument>,
  ) {}

  getOwaDocumentSelectOption() {
    return {
      id: true,
      url: true,
      uri: true,
      pageTitle: true,
      pageType: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    };
  }

  async findAll(): Promise<OwaDocument[]> {
    const selectOpt = this.getOwaDocumentSelectOption();
    const list = await this.owaDocumentRepository.find({
      select: selectOpt,
      where: {
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return list;
  }

  async findOneById(id: number): Promise<OwaDocument> {
    const selectOpt = this.getOwaDocumentSelectOption();
    const item = await this.owaDocumentRepository.findOne({
      select: selectOpt,
      where: {
        id,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return item;
  }

  async created(input: CreateOwaDocumentDto): Promise<OwaDocument> {
    const createPayload = this.owaDocumentRepository.create({
      ...input,
    });
    const created = await this.owaDocumentRepository.save(createPayload);
    const createdTarget = await this.findOneById(created.id);
    return createdTarget;
  }

  async updated(input: UpdateOwaDocumentDto): Promise<OwaDocument> {
    const { id, ...payload } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found user id: ${id}`);
    }
    const { affected } = await this.owaDocumentRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { ...payload },
    );
    if (affected !== 1) {
      this.logger.warn(`update affected: ${affected}`);
    }
    const updatedTarget = await this.findOneById(input.id);
    return updatedTarget;
  }

  async deleted(id: number): Promise<BooleanResultDto> {
    const target = await this.findOneById(id);
    const { affected } = await this.owaDocumentRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { deletedAt: DateTimeUtility.getUnixtimeMilliseconds() },
    );
    if (affected !== 1) {
      this.logger.warn(`delete affected: ${affected}`);
    }
    return { isSuccess: affected === 1 };
  }
}
