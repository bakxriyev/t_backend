import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto, NewsQueryDto } from './news.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';
import { Request } from 'express';
import * as path from 'path';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all news with pagination' })
  async findAll(@Query() query: NewsQueryDto) {
    return this.newsService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get news by ID' })
  async findById(@Param('id') id: number) {
    return this.newsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create news' })
  async create(@Body() dto: CreateNewsDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.newsService.create(dto, image);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update news' })
  async update(@Param('id') id: number, @Body() dto: UpdateNewsDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.newsService.update(id, dto, image);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete news' })
  async delete(@Param('id') id: number) {
    return this.newsService.delete(id);
  }
}
