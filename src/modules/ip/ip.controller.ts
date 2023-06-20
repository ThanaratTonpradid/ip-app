import { Controller, Get, Req } from '@nestjs/common';
import { IpService } from './ip.service';
import { Request } from 'express';
import { TokenAuth } from '../../decorators/token-auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { IPInfoDto } from './dto';

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
}
