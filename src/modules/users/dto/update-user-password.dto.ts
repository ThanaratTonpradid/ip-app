import { IsDefined, IsNumber, Length } from 'class-validator';
import { BaseDto } from '../../../dto';

export class UpdateUserPasswordDto extends BaseDto<UpdateUserPasswordDto> {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsDefined()
  @Length(8, 16)
  password: string;
}
