import {
    IsDefined,
    IsString,
  } from 'class-validator';
  import { BaseDto } from '../../../dto';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class CreateOwaUaDto extends BaseDto<CreateOwaUaDto> {
    @IsDefined()
    @IsString()
    @ApiProperty()
    browser_type: string;
  
    @IsDefined()
    @IsString()
    @ApiProperty()
    ua: string;
  
    @IsDefined()
    @IsString()
    @ApiProperty()
    browser: string;
  }
  