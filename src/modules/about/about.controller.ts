import { Controller, Get, Post, Put, Param, Body, UseGuards, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
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
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create about information' })
  async create(@Body() dto: CreateAboutDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.aboutService.create(dto, image);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update about by ID' })
  async update(@Param('id') id: number, @Body() dto: UpdateAboutDto, @UploadedFile() file?: Express.Multer.File) {
    const image = file ? `/uploads/${file.filename}` : undefined;
    return this.aboutService.update(id, dto, image);
  }
}
