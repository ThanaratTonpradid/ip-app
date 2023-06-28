import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../../decorators';
import { OwaSite } from '../../entities/owa_site.entity';
import { BooleanResultDto, ExceptionResponseDto } from '../../dto';
import { CreateOwaSiteDto, UpdateOwaSiteDto } from './dto';
import { OwaSiteService } from './owa-site.service';

@ApiTags('owa-site')
@Controller('owa-site')
export class OwaSiteController {
  constructor(private readonly owaSiteService: OwaSiteService) {}
  @JwtGuard()
  @ApiProperty({ type: [OwaSite] })
  @Get()
  async getAllUser(): Promise<OwaSite[]> {
    return this.owaSiteService.findAll();
  }

  @JwtGuard()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaSite })
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<OwaSite> {
    return this.owaSiteService.findOneById(id);
  }

  @JwtGuard()
  @ApiBadRequestResponse({ type: ExceptionResponseDto })
  @ApiConflictResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaSite })
  @Post('create')
  async createUser(@Body() dto: CreateOwaSiteDto): Promise<OwaSite> {
    return this.owaSiteService.created(dto);
  }

  @JwtGuard()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: OwaSite })
  @Patch('update')
  async updateUser(@Body() dto: UpdateOwaSiteDto): Promise<OwaSite> {
    return this.owaSiteService.updated(dto);
  }

  @JwtGuard()
  @ApiNotFoundResponse({ type: ExceptionResponseDto })
  @ApiProperty({ type: BooleanResultDto })
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<BooleanResultDto> {
    return this.owaSiteService.deleted(id);
  }
}
