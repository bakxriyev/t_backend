import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VacanciesService } from './vacancies.service';
import { CreateVacancyDto, UpdateVacancyDto, VacancyQueryDto } from './vacancies.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Vacancies')
@Controller('vacancies')
export class VacanciesController {
  constructor(private vacanciesService: VacanciesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all vacancies with pagination' })
  async findAll(@Query() query: VacancyQueryDto) {
    return this.vacanciesService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get vacancy by ID' })
  async findById(@Param('id') id: number) {
    return this.vacanciesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create vacancy' })
  async create(@Body() dto: CreateVacancyDto) {
    return this.vacanciesService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update vacancy' })
  async update(@Param('id') id: number, @Body() dto: UpdateVacancyDto) {
    return this.vacanciesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete vacancy' })
  async delete(@Param('id') id: number) {
    return this.vacanciesService.delete(id);
  }
}
