import { IsDefined, IsOptional, IsString, IsNumber } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOwaVisitorDto extends BaseDto<UpdateOwaVisitorDto> {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  visitor_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  visitor_email: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  firstSessionId: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  firstSessionTime: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  lastSessionId: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastSessionTime: string;
}
