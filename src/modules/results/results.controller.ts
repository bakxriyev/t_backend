import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, UseInterceptors, UploadedFile, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create result' })
  async create(@Body() dto: CreateResultDto, @UploadedFile() file?: Express.Multer.File) {
    const photo = file ? `/uploads/${file.filename}` : undefined;
    return this.resultsService.create(dto, photo);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo', multerConfig))
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update result' })
  async update(@Param('id') id: number, @Body() dto: UpdateResultDto, @UploadedFile() file?: Express.Multer.File) {
    const photo = file ? `/uploads/${file.filename}` : undefined;
    return this.resultsService.update(id, dto, photo);
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
