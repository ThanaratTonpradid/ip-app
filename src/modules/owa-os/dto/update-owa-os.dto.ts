import {
    IsDefined,
    IsOptional,
    IsString,
    IsNumber,
  } from 'class-validator';
  import { BaseDto } from '../../../dto';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class UpdateOwaOsDto extends BaseDto<UpdateOwaOsDto> {
    @IsDefined()
    @IsNumber()
    @ApiProperty()
    id: number;
  
    @IsOptional()
    @IsString()
    @ApiProperty()
    name: string;
  }
  