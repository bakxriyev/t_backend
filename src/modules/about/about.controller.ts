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
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ], multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create about information' })
  async create(
    @Body() dto: CreateAboutDto,
    @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    const image = files?.image?.[0] ? `/uploads/${files.image[0].filename}` : undefined;
    const video = files?.video?.[0] ? `/uploads/${files.video[0].filename}` : undefined;
    return this.aboutService.create(dto, image, video);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ], multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update about by ID' })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateAboutDto,
    @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Req() req: Request,
  ) {
    const image = files?.image?.[0] ? `/uploads/${files.image[0].filename}` : undefined;
    const video = files?.video?.[0] ? `/uploads/${files.video[0].filename}` : undefined;
    const removeImage = req.body?._removeImage === '1';
    const removeVideo = req.body?._removeVideo === '1';
    return this.aboutService.update(id, dto, image, video, removeImage, removeVideo);
  }
}
