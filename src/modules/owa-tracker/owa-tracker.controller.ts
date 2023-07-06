import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OwaTrackerService } from './owa-tracker.service';
import { CreateTrackerTemplateRequestDto } from './dto';
import { CreateTrackerTemplateRequest, GetTrackerTemplateRequest } from './interfaces';

@ApiTags('owa-tracker')
@Controller('owa-tracker')
export class OwaTrackerController {
  constructor(private readonly owaTrackerService: OwaTrackerService) {}

  @Get(':siteId')
  async getTracker(
    @Param('siteId') siteId: number,
  ): Promise<string> {
    const request: GetTrackerTemplateRequest = { siteId };
    return this.owaTrackerService.getTracker(request);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Put('template')
  async setTemplate(
    @Body() requestDto: CreateTrackerTemplateRequestDto,
  ): Promise<string> {
    await Promise.resolve();
    const request: CreateTrackerTemplateRequest = {
      ...requestDto,
    };
    return this.owaTrackerService.createTemplate(request);
  }
}
