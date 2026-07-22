import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AboutValuesService } from './about-values.service';
import { CreateAboutValueDto, UpdateAboutValueDto } from './about-values.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('About Values')
@Controller('about-values')
export class AboutValuesController {
  constructor(private service: AboutValuesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all about values' })
  async findAll() {
    return this.service.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get about value by ID' })
  async findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create about value' })
  async create(@Body() dto: CreateAboutValueDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update about value' })
  async update(@Param('id') id: number, @Body() dto: UpdateAboutValueDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete about value' })
  async delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
