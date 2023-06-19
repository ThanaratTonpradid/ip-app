import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends BaseDto<CreateUserDto> {
  @IsDefined()
  @Length(8, 50)
  @ApiProperty()
  username: string;

  @IsDefined()
  @Length(8, 16)
  @ApiProperty()
  password: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  role: string;

  @IsOptional()
  @IsString()
  @Length(10, 100)
  @ApiProperty()
  fullname: string;

  @IsEmail()
  @IsOptional()
  @Length(10, 100)
  @ApiProperty()
  email: string;
}
