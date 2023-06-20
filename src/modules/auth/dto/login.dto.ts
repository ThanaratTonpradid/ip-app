import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, Length } from 'class-validator';
import { BaseDto } from '../../../dto';

export class LoginDto extends BaseDto<LoginDto> {
  @IsDefined()
  @Length(8, 50)
  @ApiProperty()
  username: string;

  @IsDefined()
  @Length(8, 16)
  @ApiProperty()
  password: string;
}
