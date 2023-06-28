import { IsDefined, IsOptional, IsString, IsNumber } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOwaHostDto extends BaseDto<UpdateOwaHostDto> {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  ipAddress: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  host: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  fullHost: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  city: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  country: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  latitude: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  longtitude: string;
}
