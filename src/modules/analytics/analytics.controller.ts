import { Controller, Get, Post, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticDto, AnalyticQueryDto } from './analytics.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Public()
  @Post('track')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Track page visit' })
  @ApiResponse({ status: 201, description: 'Visit tracked' })
  async trackVisit(@Body() dto: CreateAnalyticDto) {
    return this.analyticsService.trackVisit(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get analytics data' })
  @ApiResponse({ status: 200, description: 'Returns analytics data' })
  async getAnalytics(@Query() query: AnalyticQueryDto) {
    return this.analyticsService.getAnalytics(query);
  }

  @Get('summary')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get analytics summary' })
  @ApiResponse({ status: 200, description: 'Returns analytics summary' })
  async getSummary() {
    return this.analyticsService.getSummary();
  }
}
