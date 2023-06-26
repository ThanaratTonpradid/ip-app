import { Logger } from '@dollarsign/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OwaOs } from '../../entities/owa_os.entity';
import { ConnectionName } from '../../constants';
import { DateTimeUtility } from '../../utils/date.util';
import { BooleanResultDto } from '../../dto';
import { CreateOwaOsDto, UpdateOwaOsDto } from './dto';

@Injectable()
export class OwaOsService {
  public readonly logger = new Logger(OwaOsService.name);
  constructor(
    @InjectRepository(OwaOs, ConnectionName.OWA)
    private owaOsRepository: Repository<OwaOs>,
  ) {}

  getOwaOsSelectOption() {
    return {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    };
  }

  async findAll(): Promise<OwaOs[]> {
    const selectOpt = this.getOwaOsSelectOption();
    const list = await this.owaOsRepository.find({
      select: selectOpt,
      where: {
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return list;
  }

  async findOneById(id: number): Promise<OwaOs> {
    const selectOpt = this.getOwaOsSelectOption();
    const item = await this.owaOsRepository.findOne({
      select: selectOpt,
      where: {
        id,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return item;
  }

  async created(input: CreateOwaOsDto): Promise<OwaOs> {
    const createPayload = this.owaOsRepository.create({
      ...input,
    });
    const created = await this.owaOsRepository.save(createPayload);
    const createdTarget = await this.findOneById(created.id);
    return createdTarget;
  }

  async updated(input: UpdateOwaOsDto): Promise<OwaOs> {
    const { id, ...payload } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found user id: ${id}`);
    }
    const { affected } = await this.owaOsRepository.update(
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
    const { affected } = await this.owaOsRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { deletedAt: DateTimeUtility.getUnixtimeMilliseconds() },
    );
    if (affected !== 1) {
      this.logger.warn(`delete affected: ${affected}`);
    }
    return { isSuccess: affected === 1 };
  }
}
