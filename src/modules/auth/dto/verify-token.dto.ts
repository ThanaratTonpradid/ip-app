import { BaseDto } from '../../../dto';
import { TokenType } from '../interfaces';

export class VerifyTokenDto extends BaseDto<VerifyTokenDto> {
  active: boolean;

  type: TokenType;

  expiresIn?: Date;
}
