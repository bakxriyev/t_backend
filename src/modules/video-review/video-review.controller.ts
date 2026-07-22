import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { VideoReviewService } from './video-review.service';
import { CreateVideoReviewDto, UpdateVideoReviewDto, VideoReviewQueryDto } from './video-review.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';

@ApiTags('Video Reviews')
@Controller('video-reviews')
export class VideoReviewController {
  constructor(private videoReviewService: VideoReviewService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all video reviews' })
  async findAll(@Query() query: VideoReviewQueryDto) {
    return this.videoReviewService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get video review by ID' })
  async findById(@Param('id') id: number) {
    return this.videoReviewService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create video review' })
  async create(@Body() dto: CreateVideoReviewDto, @UploadedFile() file?: Express.Multer.File) {
    const video = file ? `/uploads/${file.filename}` : undefined;
    return this.videoReviewService.create(dto, video);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update video review' })
  async update(@Param('id') id: number, @Body() dto: UpdateVideoReviewDto, @UploadedFile() file?: Express.Multer.File) {
    const video = file ? `/uploads/${file.filename}` : undefined;
    return this.videoReviewService.update(id, dto, video);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete video review' })
  async delete(@Param('id') id: number) {
    return this.videoReviewService.delete(id);
  }
}
