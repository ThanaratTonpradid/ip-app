import { IsDefined, IsOptional, IsString } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOwaDocumentDto extends BaseDto<CreateOwaDocumentDto> {
  @IsDefined()
  @IsString()
  @ApiProperty()
  url: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  uri: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  pageTitle: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  pageType: string;
}
