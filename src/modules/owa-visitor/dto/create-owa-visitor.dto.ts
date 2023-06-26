import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOwaVisitorDto extends BaseDto<CreateOwaVisitorDto> {
  @IsOptional()
  @IsString()
  @ApiProperty()
  visitor_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  visitor_email: string;

  @IsDefined()
  @IsNumber()
  @ApiProperty()
  firstSessionId: number;

  @IsDefined()
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
