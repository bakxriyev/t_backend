import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto, CourseQueryDto } from './course.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';

@ApiTags('Courses (Offers)')
@Controller('courses/offers')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all courses with pagination' })
  async findAll(@Query() query: CourseQueryDto) {
    return this.courseService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  async findById(@Param('id') id: number) {
    return this.courseService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create course' })
  async create(@Body() dto: CreateCourseDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.courseService.create(dto, image);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update course' })
  async update(@Param('id') id: number, @Body() dto: UpdateCourseDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.courseService.update(id, dto, image);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete course' })
  async delete(@Param('id') id: number) {
    return this.courseService.delete(id);
  }
}
