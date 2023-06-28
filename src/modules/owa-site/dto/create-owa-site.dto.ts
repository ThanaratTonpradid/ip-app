import { IsDefined, IsUrl, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOwaSiteDto extends BaseDto<CreateOwaSiteDto> {
  @IsDefined()
  @IsUrl()
  @ApiProperty()
  domain: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  kind: string;
}
