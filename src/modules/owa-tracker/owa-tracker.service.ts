import { Injectable } from '@nestjs/common';
import { Logger } from '@dollarsign/logger';
import Redis from 'ioredis';
import { SessionInfoPayload } from '../../interfaces';
import { InjectRedisData } from '../../decorators';
import { ConstantName, SettingName } from '../../constants';
import { OwaSiteService } from '../owa-site/owa-site.service';
import { CreateTrackerTemplateRequest, GetTrackerTemplateRequest } from './interfaces';
import { owaTrackerTemplate } from './tracker-template';
import { OwaSettingService } from '../owa-setting/owa-setting.service';

@Injectable()
export class OwaTrackerService {
  public readonly logger = new Logger(OwaTrackerService.name);

  constructor(
    @InjectRedisData()
    protected readonly redisData: Redis,
    private readonly owaSiteService: OwaSiteService,
    private readonly owaSettingService: OwaSettingService,
  ) {}

  async createTemplate(request: CreateTrackerTemplateRequest): Promise<string> {
    const key = ConstantName.OWA_TRACKER_TEMPLATE_KEY;
    const template = request?.template || owaTrackerTemplate;
    await this.redisData.set(key, template);
    return this.redisData.get(key);
  }

  async getTracker(request: GetTrackerTemplateRequest): Promise<string> {
    const { siteId } = request;
    const key = ConstantName.OWA_TRACKER_TEMPLATE_KEY;
    const template = await this.redisData.get(key);
    const site = await this.owaSiteService.findOneById(siteId);
    const owaName = await this.owaSettingService.findOneByName(SettingName.OWA_NAME);
    const owaBaseUrl = await this.owaSettingService.findOneByName(SettingName.OWA_BASE_URL);
    const replaceTemplate = template
      .replace('-OWA_NAME-', owaName.value)
      .replace('{OWA_BASE_URL}', owaBaseUrl.value)
      .replace('{OWA_SITE_ID}', site.siteId);
    return replaceTemplate;
  }
}
