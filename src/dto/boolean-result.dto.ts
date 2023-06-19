import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class BooleanResultDto extends BaseDto<BooleanResultDto> {
    @ApiProperty()
    isSuccess: boolean;
}
