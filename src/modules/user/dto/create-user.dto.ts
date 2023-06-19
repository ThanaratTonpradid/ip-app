import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { BaseDto } from '../../../dto';

export class CreateUserDto extends BaseDto<CreateUserDto> {
  @IsDefined()
  @Length(8, 50)
  username: string;

  @IsDefined()
  @Length(8, 16)
  password: string;

  @IsDefined()
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
