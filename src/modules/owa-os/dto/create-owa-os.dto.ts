import {
    IsDefined,
    IsString,
  } from 'class-validator';
  import { BaseDto } from '../../../dto';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateOwaOsDto extends BaseDto<CreateOwaOsDto> {
    @IsDefined()
    @IsString()
    @ApiProperty()
    name: string;
  }
  