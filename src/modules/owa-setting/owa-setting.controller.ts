import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiNotFoundResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { OwaSettingService } from './owa-setting.service';
import { OwaSetting } from '../../entities/owa_setting.entity';
import { JwtGuard } from '../../decorators';
import { BooleanResultDto, ExceptionResponseDto } from '../../dto';
import { CreateOwaSettingDto, UpdateOwaSettingDto } from './dto';

@ApiTags('owa-setting')
@Controller('owa-setting')
export class OwaSettingController {
  constructor(private readonly owaSettingService: OwaSettingService) {}

  @JwtGuard()
  @ApiProperty({ type: [OwaSetting] })
  @Get()
  async getAllUser(): Promise<OwaSetting[]> {
    return this.owaSettingService.findAll();
  }

  @JwtGuard()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaSetting })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<OwaSetting> {
    return this.owaSettingService.findOneById(id);
  }

  @JwtGuard()
  @ApiBadRequestResponse({ type: ExceptionResponseDto })
  @ApiConflictResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaSetting })
  @Post('create')
  async createUser(@Body() dto: CreateOwaSettingDto): Promise<OwaSetting> {
    return this.owaSettingService.created(dto);
  }

  @JwtGuard()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaSetting })
  @Patch('update')
  async updateUser(@Body() dto: UpdateOwaSettingDto): Promise<OwaSetting> {
    return this.owaSettingService.updated(dto);
  }

  @JwtGuard()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: BooleanResultDto })
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<BooleanResultDto> {
    return this.owaSettingService.deleted(id);
  }
}
