import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { TelegramService } from '../telegram/telegram.service';
import { CreateCourseApplicationDto, UpdateCourseApplicationDto, CourseApplicationQueryDto } from './courses.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Course Applications')
@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private telegramService: TelegramService,
  ) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit course application (public)' })
  async create(@Body() dto: CreateCourseApplicationDto) {
    return this.coursesService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all course applications (admin)' })
  async findAll(@Query() query: CourseApplicationQueryDto) {
    return this.coursesService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get course application by ID' })
  async findById(@Param('id') id: number) {
    return this.coursesService.findById(id);
  }

  @Post(':id/telegram')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Re-send a course application to the Telegram leads channel' })
  async sendToTelegram(@Param('id') id: number) {
    const app = await this.coursesService.findById(id);
    await this.telegramService.sendCourseNotification(app);
    return { message: 'Sent to Telegram' };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update course application' })
  async update(@Param('id') id: number, @Body() dto: UpdateCourseApplicationDto) {
    return this.coursesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete course application' })
  async delete(@Param('id') id: number) {
    return this.coursesService.delete(id);
  }
}
