import { Inject } from '@nestjs/common';
import { RedisName } from '../configs';

export function InjectRedisSession(): ParameterDecorator {
  return Inject(RedisName.SESSION);
}
