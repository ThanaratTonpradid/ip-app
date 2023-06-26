import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwaUa } from '../../entities/owa_ua.entity';
import { IsNull, Repository } from 'typeorm';
import { BooleanResultDto } from '../../dto';
import { CreateOwaUaDto, UpdateOwaUaDto } from './dto';
import { DateTimeUtility } from '../../utils/date.util';
import { Logger } from '@dollarsign/logger';
import { ConnectionName } from '../../constants';

@Injectable()
export class OwaUaService {
    public readonly logger = new Logger(OwaUaService.name);
  constructor(
    @InjectRepository(OwaUa, ConnectionName.OWA)
    private owaUaRepository: Repository<OwaUa>,
  ) {}

  getOwaUaSelectOption() {
    return {
      id: true,
      browser_type: true,
      ua: true,
      browser: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    };
  }

  async findAll(): Promise<OwaUa[]> {
    const selectOpt = this.getOwaUaSelectOption();
    const users = await this.owaUaRepository.find({
      select: selectOpt,
      where: {
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    this.logger.debug(users);
    return users;
  }

  async findOneById(id: number): Promise<OwaUa> {
    const selectOpt = this.getOwaUaSelectOption();
    const user = await this.owaUaRepository.findOne({
      select: selectOpt,
      where: {
        id,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return user;
  }

  async created(input: CreateOwaUaDto): Promise<OwaUa> {
    const createPayload = this.owaUaRepository.create({
      ...input,
    });
    const created = await this.owaUaRepository.save(createPayload);
    const createdTarget = await this.findOneById(created.id);
    return createdTarget;
  }

  async updated(input: UpdateOwaUaDto): Promise<OwaUa> {
    const { id, ...payload } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found user id: ${id}`);
    }
    const { affected } = await this.owaUaRepository.update(
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
    const { affected } = await this.owaUaRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { deletedAt: DateTimeUtility.getUnixtimeMilliseconds() },
    );
    if (affected !== 1) {
      this.logger.warn(`delete affected: ${affected}`);
    }
    return { isSuccess: affected === 1 };
  }
}
