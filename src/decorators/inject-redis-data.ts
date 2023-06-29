import { Inject } from '@nestjs/common';
import { RedisName } from '../configs';

export function InjectRedisData(): ParameterDecorator {
  return Inject(RedisName.DATA);
}
