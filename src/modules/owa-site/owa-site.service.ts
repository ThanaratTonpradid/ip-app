import { Logger } from '@dollarsign/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { v5 as uuidV5 } from 'uuid';
import { OwaSite } from '../../entities/owa_site.entity';
import { ConnectionName } from '../../constants';
import { DateTimeUtility } from '../../utils/date.util';
import { BooleanResultDto } from '../../dto';
import { CreateOwaSiteDto, UpdateOwaSiteDto } from './dto';

@Injectable()
export class OwaSiteService {
  public readonly logger = new Logger(OwaSiteService.name);
  constructor(
    @InjectRepository(OwaSite, ConnectionName.OWA)
    private owaSiteRepository: Repository<OwaSite>,
  ) {}

  getOwaSiteSelectOption() {
    return {
      id: true,
      siteId: true,
      domain: true,
      name: true,
      description: true,
      kind: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    };
  }

  async findAll(): Promise<OwaSite[]> {
    const selectOpt = this.getOwaSiteSelectOption();
    const list = await this.owaSiteRepository.find({
      select: selectOpt,
      where: {
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return list;
  }

  async findOneById(id: number): Promise<OwaSite> {
    const selectOpt = this.getOwaSiteSelectOption();
    const item = await this.owaSiteRepository.findOne({
      select: selectOpt,
      where: {
        id,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return item;
  }

  async created(input: CreateOwaSiteDto): Promise<OwaSite> {
    const { domain, ...payload } = input;
    const siteId = uuidV5(domain, uuidV5.URL)
    const createPayload = this.owaSiteRepository.create({
      siteId,
      domain,
      ...payload,
    });
    const created = await this.owaSiteRepository.save(createPayload);
    const createdTarget = await this.findOneById(created.id);
    return createdTarget;
  }

  async updated(input: UpdateOwaSiteDto): Promise<OwaSite> {
    const { id, ...payload } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found user id: ${id}`);
    }
    const { affected } = await this.owaSiteRepository.update(
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
    const { affected } = await this.owaSiteRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { deletedAt: DateTimeUtility.getUnixtimeMilliseconds() },
    );
    if (affected !== 1) {
      this.logger.warn(`delete affected: ${affected}`);
    }
    return { isSuccess: affected === 1 };
  }
}
