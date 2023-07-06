import { Logger } from '@dollarsign/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OwaSetting } from '../../entities/owa_setting.entity';
import { ConnectionName } from '../../constants';
import { DateTimeUtility } from '../../utils/date.util';
import { BooleanResultDto } from '../../dto';
import { CreateOwaSettingDto, UpdateOwaSettingDto } from './dto';

@Injectable()
export class OwaSettingService {
  public readonly logger = new Logger(OwaSettingService.name);
  constructor(
    @InjectRepository(OwaSetting, ConnectionName.OWA)
    private owaSettingRepository: Repository<OwaSetting>,
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

  async findAll(): Promise<OwaSetting[]> {
    const selectOpt = this.getOwaOsSelectOption();
    const list = await this.owaSettingRepository.find({
      select: selectOpt,
      where: {
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return list;
  }

  async findOneById(id: number): Promise<OwaSetting> {
    const selectOpt = this.getOwaOsSelectOption();
    const item = await this.owaSettingRepository.findOne({
      select: selectOpt,
      where: {
        id,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return item;
  }

  async created(input: CreateOwaSettingDto): Promise<OwaSetting> {
    const createPayload = this.owaSettingRepository.create({
      ...input,
    });
    const created = await this.owaSettingRepository.save(createPayload);
    const createdTarget = await this.findOneById(created.id);
    return createdTarget;
  }

  async updated(input: UpdateOwaSettingDto): Promise<OwaSetting> {
    const { id, ...payload } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found id: ${id}`);
    }
    const { affected } = await this.owaSettingRepository.update(
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
    const { affected } = await this.owaSettingRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { deletedAt: DateTimeUtility.getUnixtimeMilliseconds() },
    );
    if (affected !== 1) {
      this.logger.warn(`delete affected: ${affected}`);
    }
    return { isSuccess: affected === 1 };
  }
}
