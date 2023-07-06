import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { BaseDto } from '../../../dto';
import { SettingName } from '../../../constants';

export class CreateOwaSettingDto extends BaseDto<CreateOwaSettingDto> {
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
