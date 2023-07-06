import { ApiProperty } from '@nestjs/swagger';

import { CreateTrackerTemplateRequest } from '../interfaces';

export class CreateTrackerTemplateRequestDto
  implements CreateTrackerTemplateRequest {
  @ApiProperty({
    example: '<script type="text/javascript"></script>',
  })
  template: string;
}
