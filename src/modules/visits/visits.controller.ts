import { Controller, Get, Post, Patch, Param, Body, Query, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { VisitsService } from './visits.service';
import { TrackVisitDto, VisitStatsQueryDto, VisitsListQueryDto, UpdateVisitLocationDto } from './visits.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Request } from 'express';

@ApiTags('Visits')
@Controller('visits')
export class VisitsController {
  constructor(private visitsService: VisitsService) {}

  @Public()
  @Post('track')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Track a page visit' })
  async trackVisit(@Body() dto: TrackVisitDto, @Req() req: Request) {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip;
    const ua = req.headers['user-agent'];
    return this.visitsService.track({
      ...dto,
      ip_address: dto.ip_address || ip,
      user_agent: dto.user_agent || ua,
    });
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get visit statistics' })
  async getStats(@Query() query: VisitStatsQueryDto) {
    return this.visitsService.getStats(query);
  }

  @Get('regions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get region-based visit statistics' })
  async getRegionStats(@Query() query: VisitStatsQueryDto) {
    return this.visitsService.getRegionStats(query);
  }

  @Patch(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update visit location' })
  async updateLocation(@Param('id') id: number, @Body() dto: UpdateVisitLocationDto) {
    return this.visitsService.updateLocation(id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get visits list' })
  async getVisits(@Query() query: VisitsListQueryDto) {
    return this.visitsService.getVisitsList(query);
  }
}
