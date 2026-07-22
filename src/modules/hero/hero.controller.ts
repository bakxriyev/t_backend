import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { HeroService } from './hero.service';
import { CreateHeroDto, UpdateHeroDto, HeroQueryDto } from './hero.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';

@ApiTags('Hero')
@Controller('hero')
export class HeroController {
  constructor(private heroService: HeroService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all hero slides with pagination' })
  async findAll(@Query() query: HeroQueryDto) {
    return this.heroService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get hero slide by ID' })
  async findById(@Param('id') id: number) {
    return this.heroService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create hero slide' })
  async create(@Body() dto: CreateHeroDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.heroService.create(dto, image);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update hero slide' })
  async update(@Param('id') id: number, @Body() dto: UpdateHeroDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.heroService.update(id, dto, image);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete hero slide' })
  async delete(@Param('id') id: number) {
    return this.heroService.delete(id);
  }
}
