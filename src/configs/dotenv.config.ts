import { config } from 'dotenv';

import { Logger } from '@nestjs/common';

const logger = new Logger('ENV-Config');
const { error, parsed } = config();
if (error) {
  throw error;
}

logger.log(parsed);
