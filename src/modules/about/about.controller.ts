import { Controller, Get, Post, Put, Param, Body, Req, UseGuards, UseInterceptors, UploadedFiles, HttpCode, HttpStatus } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';
import { AboutService } from './about.service';
import { CreateAboutDto, UpdateAboutDto } from './about.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';

@ApiTags('About')
@Controller('about')
export class AboutController {
  constructor(private aboutService: AboutService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get about information' })
  async find() {
    return this.aboutService.find();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 20 },
    { name: 'videos', maxCount: 10 },
  ], multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create about information' })
  async create(
    @Body() dto: CreateAboutDto,
    @UploadedFiles() files: { images?: Express.Multer.File[]; videos?: Express.Multer.File[] },
  ) {
    const imagePaths = files?.images?.map(f => `/uploads/${f.filename}`) || [];
    const videoPaths = files?.videos?.map(f => `/uploads/${f.filename}`) || [];
    return this.aboutService.create(dto, imagePaths, videoPaths);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 20 },
    { name: 'videos', maxCount: 10 },
  ], multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update about by ID' })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAboutDto,
    @UploadedFiles() files: { images?: Express.Multer.File[]; videos?: Express.Multer.File[] },
    @Req() req: Request,
  ) {
    const existingImages = req.body?.existingImages || '[]';
    const existingVideos = req.body?.existingVideos || '[]';
    let parsedImages: string[];
    let parsedVideos: string[];
    try {
      parsedImages = JSON.parse(existingImages);
    } catch { parsedImages = []; }
    try {
      parsedVideos = JSON.parse(existingVideos);
    } catch { parsedVideos = []; }

    const newImagePaths = files?.images?.map(f => `/uploads/${f.filename}`) || [];
    const newVideoPaths = files?.videos?.map(f => `/uploads/${f.filename}`) || [];

    const allImages = [...parsedImages, ...newImagePaths];
    const allVideos = [...parsedVideos, ...newVideoPaths];

    return this.aboutService.update(id, dto, allImages, allVideos);
  }
}
