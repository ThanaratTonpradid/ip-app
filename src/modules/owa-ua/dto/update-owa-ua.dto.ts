import { IsDefined, IsOptional, IsString, IsNumber } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOwaUaDto extends BaseDto<UpdateOwaUaDto> {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  browser_type: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  ua: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  browser: string;
}
