import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OwaUser } from '../../entities/owa_user.entity';
import { IsNull, Repository } from 'typeorm';
import { BooleanResultDto } from '../../dto';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dto';
import { DateTimeUtility } from '../../utils/date.util';
import { Logger } from '@dollarsign/logger';
import { PasswordUtility } from '../../utils/password.util';
import { ConnectionName } from '../../constants';

@Injectable()
export class UserService {
  public readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(OwaUser, ConnectionName.OWA)
    private userRepository: Repository<OwaUser>,
  ) {}

  async findAll(): Promise<OwaUser[]> {
    const users = await this.userRepository.find({
      where: {
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return users;
  }

  async findOneById(id: number): Promise<OwaUser> {
    const user = await this.userRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return user;
  }

  async findOneByUsername(username: string): Promise<OwaUser> {
    const user = await this.userRepository.findOne({
      where: {
        username,
        deletedAt: IsNull(),
      },
      order: { id: 'ASC' },
    });
    return user;
  }

  async created(input: CreateUserDto): Promise<OwaUser> {
    const { password, ...payload } = input;
    const createPayload = this.userRepository.create({
      ...payload,
      password: PasswordUtility.genPassword(password),
    });
    const created = await this.userRepository.save(createPayload);
    return { ...created, password: null };
  }

  async updated(input: UpdateUserDto): Promise<OwaUser> {
    const { id, ...payload } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found user id: ${id}`);
    }
    const { affected } = await this.userRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { ...payload },
    );
    if (affected !== 1) {
      this.logger.warn(`update affected: ${affected}`);
    }
    const updatedTarget = await this.findOneById(input.id);
    return { ...updatedTarget, password: null };
  }

  async updatePassword(input: UpdateUserPasswordDto): Promise<OwaUser> {
    const { id, password } = input;
    const target = await this.findOneById(input.id);
    if (!target) {
      this.logger.warn(`not found user id: ${id}`);
    }
    const { affected } = await this.userRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { password: PasswordUtility.genPassword(password) },
    );
    if (affected !== 1) {
      this.logger.warn(`update password affected: ${affected}`);
    }
    const updatedTarget = await this.findOneById(input.id);
    return { ...updatedTarget, password: null };
  }

  async delete(id: number): Promise<BooleanResultDto> {
    const target = await this.findOneById(id);
    const { affected } = await this.userRepository.update(
      { id: target.id, deletedAt: IsNull() },
      { deletedAt: DateTimeUtility.getUnixtimeMilliseconds() },
    );
    if (affected !== 1) {
      this.logger.warn(`delete affected: ${affected}`);
    }
    return { isSuccess: affected === 1 };
  }
}
