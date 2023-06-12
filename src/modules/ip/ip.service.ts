import { Logger } from '@dollarsign/logger';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UAParser } from 'ua-parser-js';
import { IPInfo } from './interfaces';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class IpService {
  private logger: Logger;

  constructor(private readonly httpService: HttpService) {
    this.logger = new Logger(IpService.name);
  }

  getMyIp(req: Request): IPInfo {
    const { ip, headers } = req;
    const userAgent = headers['user-agent'];
    const userAgentParser = new UAParser(userAgent);
    const ipInfo: IPInfo = {
      ip: ip,
      browser: userAgentParser.getBrowser(),
      cpu: userAgentParser.getCPU(),
      device: userAgentParser.getDevice(),
      os: userAgentParser.getOS(),
      engine: userAgentParser.getEngine(),
    };
    return ipInfo;
  }

  async getLocation(req: Request): Promise<any> {
    try {
      this.logger.info(`ip(${req.ip})getLocation() request`);
      const url = `https://ipapi.co/${req.ip}/json`;
      const res = await this.httpService.get(url).toPromise();
      this.logger.success(`ip(${req.ip})getLocation() success`);
      return res.data;
    } catch (error) {
      this.logger.error(`ip(${req.ip})getLocation() error`, error);
      throw error;
    }
  }
}
