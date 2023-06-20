import { Controller, Get, HttpStatus, Req } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { IpService } from './ip.service';
import { IPInfoDto } from './dto';
import { TokenAuth, AccessInfo } from '../../decorators';
import { AccessInfoPayload } from '../../interfaces';

@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @TokenAuth()
  @Get()
  @ApiResponse({
    status: 200,
    type: IPInfoDto,
  })
  getMyIp(@Req() req: Request): IPInfoDto {
    return this.ipService.getMyIp(req);
  }

  @TokenAuth()
  @Get('geo-location')
  @ApiResponse({
    status: 200,
  })
  async getLocation(@Req() req: Request): Promise<any> {
    return this.ipService.getLocation(req);
  }

  @TokenAuth()
  @Get('access-info')
  @ApiResponse({ status: HttpStatus.OK })
  getAccessInfo(
    @AccessInfo() accessInfo: AccessInfoPayload,
  ): AccessInfoPayload {
    return this.ipService.getAccessInfo(accessInfo);
  }
}
