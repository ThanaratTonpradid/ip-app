import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiProperty,
} from '@nestjs/swagger';
import { OwaUser } from 'src/entities/owa_user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dto';
import { BooleanResultDto, ExceptionResponseDto } from '../../dto';
import { TokenAuth } from '../auth/decorators/token-auth.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @TokenAuth()
  @ApiProperty({ type: [OwaUser] })
  @Get()
  async getAllUser(): Promise<OwaUser[]> {
    return this.userService.findAll();
  }

  @TokenAuth()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaUser })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<OwaUser> {
    return this.userService.findOneById(id);
  }

  @TokenAuth()
  @ApiBadRequestResponse({ type: ExceptionResponseDto })
  @ApiConflictResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaUser })
  @Post('create')
  async createUser(@Body() dto: CreateUserDto): Promise<OwaUser> {
    return this.userService.created(dto);
  }

  @TokenAuth()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaUser })
  @Patch('update')
  async updateUser(@Body() dto: UpdateUserDto): Promise<OwaUser> {
    return this.userService.updated(dto);
  }

  @TokenAuth()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaUser })
  @Patch('updatePassword')
  async updateUserPassword(
    @Body() dto: UpdateUserPasswordDto,
  ): Promise<OwaUser> {
    return this.userService.updatePassword(dto);
  }

  @TokenAuth()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: BooleanResultDto })
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<BooleanResultDto> {
    return this.userService.delete(id);
  }
}
