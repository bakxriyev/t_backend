import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFiles, HttpCode, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { CreateResultDto, UpdateResultDto, ResultQueryDto } from './results.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';

@ApiTags('Results')
@Controller('results')
export class ResultsController {
  constructor(private resultsService: ResultsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all results with pagination' })
  async findAll(@Query() query: ResultQueryDto) {
    return this.resultsService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get result by ID' })
  async findById(@Param('id') id: number) {
    return this.resultsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('photo', 50, multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create result (supports multiple photos)' })
  async create(@Body() dto: CreateResultDto, @UploadedFiles() files?: Express.Multer.File[]) {
    const photoUrls = files?.map(f => `/uploads/${f.filename}`) || [];
    return this.resultsService.create(dto, photoUrls);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('photo', 50, multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update result (supports multiple photos)' })
  async update(@Param('id') id: number, @Body() dto: UpdateResultDto, @UploadedFiles() files?: Express.Multer.File[]) {
    const photoUrls = files?.map(f => `/uploads/${f.filename}`) || [];
    return this.resultsService.update(id, dto, photoUrls);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete result' })
  async delete(@Param('id') id: number) {
    return this.resultsService.delete(id);
  }
}
