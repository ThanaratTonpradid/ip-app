import { IsDefined, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../../dto';
import { SettingName } from '../../../constants';

export class UpdateOwaSettingDto extends BaseDto<UpdateOwaSettingDto> {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsDefined()
  @IsString()
  @ApiProperty({
    enum: SettingName,
    examples: [SettingName.OWA_NAME, SettingName.OWA_BASE_URL],
  })
  name: SettingName;

  @IsDefined()
  @IsString()
  @ApiProperty()
  value: string;
}
