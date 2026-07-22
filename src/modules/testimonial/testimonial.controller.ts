import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto, UpdateTestimonialDto, TestimonialQueryDto } from './testimonial.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';

@ApiTags('Testimonials')
@Controller('testimonials')
export class TestimonialController {
  constructor(private testimonialService: TestimonialService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all testimonials with pagination' })
  async findAll(@Query() query: TestimonialQueryDto) {
    return this.testimonialService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get testimonial by ID' })
  async findById(@Param('id') id: number) {
    return this.testimonialService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create testimonial' })
  async create(@Body() dto: CreateTestimonialDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.testimonialService.create(dto, image);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update testimonial' })
  async update(@Param('id') id: number, @Body() dto: UpdateTestimonialDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.testimonialService.update(id, dto, image);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete testimonial' })
  async delete(@Param('id') id: number) {
    return this.testimonialService.delete(id);
  }
}
