import { Logger } from '@dollarsign/logger';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { OwaHost } from '../../entities/owa_host.entity';
import { ConnectionName } from '../../constants';
import { DateTimeUtility } from '../../utils/date.util';
import { BooleanResultDto } from '../../dto';
import { CreateOwaHostDto, UpdateOwaHostDto } from './dto';

@Injectable()
export class OwaHostService {
  public readonly logger = new Logger(OwaHostService.name);
  constructor(
    @InjectRepository(OwaHost, ConnectionName.OWA)
    private owaHostRepository: Repository<OwaHost>,
  ) {}

  getOwaHostSelectOption() {
    return {
      id: true,
      ipAddress: true,
      host: true,
      fullHost: true,
      city: true,
      country: true,
      latitude: true,
      longtitude: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    };
  }

  async findAll(): Promise<OwaHost[]> {
    const selectOpt = this.getOwaHostSelectOption();
    const list = await this.owaHostRepository.find({
      select: selectOpt,
      where: {
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return list;
  }

  async findOneById(id: number): Promise<OwaHost> {
    const selectOpt = this.getOwaHostSelectOption();
    const item = await this.owaHostRepository.findOne({
      select: selectOpt,
      where: {
        id,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return item;
  }

  async created(input: CreateOwaHostDto): Promise<OwaHost> {
    const createPayload = this.owaHostRepository.create({
      ...input,
    });
    const created = await this.owaHostRepository.save(createPayload);
    const createdTarget = await this.findOneById(created.id);
    return createdTarget;
  }

  async updated(input: UpdateOwaHostDto): Promise<OwaHost> {
    const { id, ...payload } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found user id: ${id}`);
    }
    const { affected } = await this.owaHostRepository.update(
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
    const { affected } = await this.owaHostRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { deletedAt: DateTimeUtility.getUnixtimeMilliseconds() },
    );
    if (affected !== 1) {
      this.logger.warn(`delete affected: ${affected}`);
    }
    return { isSuccess: affected === 1 };
  }
}
