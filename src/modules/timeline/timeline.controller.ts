import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TimelineService } from './timeline.service';
import { CreateTimelineItemDto, UpdateTimelineItemDto } from './timeline.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Timeline')
@Controller('timeline')
export class TimelineController {
  constructor(private timelineService: TimelineService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all timeline items' })
  async findAll() {
    return this.timelineService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get timeline item by ID' })
  async findById(@Param('id') id: number) {
    return this.timelineService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create timeline item' })
  async create(@Body() dto: CreateTimelineItemDto) {
    return this.timelineService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update timeline item by ID' })
  async update(@Param('id') id: number, @Body() dto: UpdateTimelineItemDto) {
    return this.timelineService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete timeline item by ID' })
  async delete(@Param('id') id: number) {
    await this.timelineService.delete(id);
  }
}
