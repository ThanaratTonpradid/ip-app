import {
  IsDefined,
  IsUrl,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOwaSiteDto extends BaseDto<UpdateOwaSiteDto> {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  domain: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  kind: string;
}
