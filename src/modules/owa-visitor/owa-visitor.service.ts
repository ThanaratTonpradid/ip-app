import { Logger } from '@dollarsign/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OwaVisitor } from '../../entities/owa_visitor.entity';
import { ConnectionName } from '../../constants';
import { DateTimeUtility } from '../../utils/date.util';
import { BooleanResultDto } from '../../dto';
import { CreateOwaVisitorDto, UpdateOwaVisitorDto } from './dto';

@Injectable()
export class OwaVisitorService {
  public readonly logger = new Logger(OwaVisitorService.name);
  constructor(
    @InjectRepository(OwaVisitor, ConnectionName.OWA)
    private owaVisitorRepository: Repository<OwaVisitor>,
  ) {}

  getOwaVisitorSelectOption() {
    return {
      id: true,
      visitor_name: true,
      visitor_email: true,
      firstSessionId: true,
      firstSessionTime: true,
      lastSessionId: true,
      lastSessionTime: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    };
  }

  async findAll(): Promise<OwaVisitor[]> {
    const selectOpt = this.getOwaVisitorSelectOption();
    const list = await this.owaVisitorRepository.find({
      select: selectOpt,
      where: {
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return list;
  }

  async findOneById(id: number): Promise<OwaVisitor> {
    const selectOpt = this.getOwaVisitorSelectOption();
    const item = await this.owaVisitorRepository.findOne({
      select: selectOpt,
      where: {
        id,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return item;
  }

  async created(input: CreateOwaVisitorDto): Promise<OwaVisitor> {
    const createPayload = this.owaVisitorRepository.create({
      ...input,
    });
    const created = await this.owaVisitorRepository.save(createPayload);
    const createdTarget = await this.findOneById(created.id);
    return createdTarget;
  }

  async updated(input: UpdateOwaVisitorDto): Promise<OwaVisitor> {
    const { id, ...payload } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found user id: ${id}`);
    }
    const { affected } = await this.owaVisitorRepository.update(
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
    const { affected } = await this.owaVisitorRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { deletedAt: DateTimeUtility.getUnixtimeMilliseconds() },
    );
    if (affected !== 1) {
      this.logger.warn(`delete affected: ${affected}`);
    }
    return { isSuccess: affected === 1 };
  }
}
