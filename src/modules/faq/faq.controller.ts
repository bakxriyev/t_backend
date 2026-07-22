import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FaqService } from './faq.service';
import { CreateFaqItemDto, UpdateFaqItemDto } from './faq.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  constructor(private faqService: FaqService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all FAQ items' })
  async findAll() {
    return this.faqService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get FAQ item by ID' })
  async findById(@Param('id') id: number) {
    return this.faqService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create FAQ item' })
  async create(@Body() dto: CreateFaqItemDto) {
    return this.faqService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update FAQ item by ID' })
  async update(@Param('id') id: number, @Body() dto: UpdateFaqItemDto) {
    return this.faqService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete FAQ item by ID' })
  async delete(@Param('id') id: number) {
    await this.faqService.delete(id);
  }
}
