import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends BaseDto<UpdateUserDto> {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsOptional()
  @Length(8, 50)
  @ApiProperty()
  username: string;

  @IsOptional()
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
