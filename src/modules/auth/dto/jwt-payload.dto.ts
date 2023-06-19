import { Expose } from 'class-transformer';

import { BaseDto } from '../../../dto';
import { JwtPayload } from '../interfaces';

export class JwtPayloadDto
  extends BaseDto<JwtPayloadDto>
  implements JwtPayload {
  @Expose()
  key: string;

  @Expose()
  hash: string;

  @Expose()
  userId: number;
}
