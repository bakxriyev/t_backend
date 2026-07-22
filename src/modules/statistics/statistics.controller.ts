import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto, UpdateStatisticDto, StatisticQueryDto } from './statistics.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  @Public()
  @Get('public')
  @ApiOperation({ summary: 'Get active statistics (public)' })
  async findActive() {
    return this.statisticsService.findActive();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all statistics (admin)' })
  async findAll(@Query() query: StatisticQueryDto) {
    return this.statisticsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get statistic by ID' })
  async findById(@Param('id') id: number) {
    return this.statisticsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create statistic' })
  async create(@Body() dto: CreateStatisticDto) {
    return this.statisticsService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update statistic' })
  async update(@Param('id') id: number, @Body() dto: UpdateStatisticDto) {
    return this.statisticsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete statistic' })
  async delete(@Param('id') id: number) {
    return this.statisticsService.delete(id);
  }
}
