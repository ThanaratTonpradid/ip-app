import { IBrowser, ICPU, IDevice, IOS, IEngine } from 'ua-parser-js';

export class IPInfo {
  ip: string;
  browser: IBrowser;
  device: IDevice;
  os: IOS;
  cpu: ICPU;
  engine: IEngine;
}
