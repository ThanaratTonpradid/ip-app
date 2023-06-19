import { BaseDto } from '../../../dto';

export class AccessTokenDto extends BaseDto<AccessTokenDto> {
  token: string;
}
