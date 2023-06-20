import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/dto';
import { IBrowser, IDevice, IOS, ICPU, IEngine } from 'ua-parser-js';

class Browser implements IBrowser {
  @ApiResponseProperty()
  name: string | undefined;
  @ApiResponseProperty()
  version: string | undefined;
  /**
   * Determined dynamically
   * @deprecated
   */
  major: string | undefined;
}

class Device implements IDevice {
  @ApiResponseProperty()
  model: string | undefined;
  @ApiResponseProperty()
  type: string | undefined;
  @ApiResponseProperty()
  vendor: string | undefined;
}

class OS implements IOS {
  @ApiResponseProperty()
  name: string | undefined;
  @ApiResponseProperty()
  version: string | undefined;
}

class CPU implements ICPU {
  @ApiResponseProperty()
  architecture: string | undefined;
}

class Engine implements IEngine {
  @ApiResponseProperty()
  name: string | undefined;
  @ApiResponseProperty()
  version: string | undefined;
}

export class IPInfoDto extends BaseDto<IPInfoDto> {
  @ApiResponseProperty()
  ip: string;
  @ApiResponseProperty({
    type: Browser,
  })
  browser: IBrowser;
  @ApiResponseProperty({
    type: Device,
  })
  device: IDevice;
  @ApiResponseProperty({
    type: OS,
  })
  os: IOS;
  @ApiResponseProperty({
    type: CPU,
  })
  cpu: ICPU;
  @ApiResponseProperty({
    type: Engine,
  })
  engine: IEngine;
}
