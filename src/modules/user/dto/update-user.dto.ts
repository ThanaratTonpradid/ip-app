import {
  IsDefined,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BaseDto } from '../../../dto';

export class UpdateUserDto extends BaseDto<UpdateUserDto> {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsOptional()
  @Length(8, 50)
  username: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  @Length(10, 100)
  fullname: string;

  @IsEmail()
  @IsOptional()
  @Length(10, 100)
  email: string;
}
