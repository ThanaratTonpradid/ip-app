import { IsDefined, IsNumber, Length } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDto extends BaseDto<UpdateUserPasswordDto> {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsDefined()
  @Length(8, 16)
  @ApiProperty()
  password: string;
}
