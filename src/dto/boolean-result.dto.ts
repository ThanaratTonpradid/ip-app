import { BaseDto } from './base.dto';

export class BooleanResultDto extends BaseDto<BooleanResultDto> {
    isSuccess: boolean;
}
