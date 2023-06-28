import { IsDefined, IsOptional, IsString, IsNumber } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOwaDocumentDto extends BaseDto<UpdateOwaDocumentDto> {
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  url: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  uri: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  pageTitle: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  pageType: string;
}
