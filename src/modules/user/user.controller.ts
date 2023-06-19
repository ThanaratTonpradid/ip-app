import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OwaUser } from 'src/entities/owa_user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dto';
import { BooleanResultDto } from 'src/dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUser(): Promise<OwaUser[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<OwaUser> {
    return this.userService.findOneById(id);
  }

  @Post('create')
  async createUser(@Body() dto: CreateUserDto): Promise<OwaUser> {
    return this.userService.created(dto);
  }

  @Patch('update')
  async updateUser(@Body() dto: UpdateUserDto): Promise<OwaUser> {
    return this.userService.updated(dto);
  }

  @Patch('updatePassword')
  async updateUserPassword(@Body() dto: UpdateUserPasswordDto): Promise<OwaUser> {
    return this.userService.updatePassword(dto);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<BooleanResultDto> {
    return this.userService.delete(id);
  }
}
