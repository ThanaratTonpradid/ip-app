import { IsDefined, IsString } from 'class-validator';
import { BaseDto } from '../../../dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOwaHostDto extends BaseDto<CreateOwaHostDto> {
  @IsDefined()
  @IsString()
  @ApiProperty()
  ipAddress: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  host: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  fullHost: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  city: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  country: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  latitude: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  longtitude: string;
}
