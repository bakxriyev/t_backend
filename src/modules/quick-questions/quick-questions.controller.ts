import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuickQuestionsService } from './quick-questions.service';
import { CreateQuickQuestionDto, UpdateQuickQuestionDto, QuickQuestionQueryDto } from './quick-questions.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Quick Questions')
@Controller('quick-questions')
export class QuickQuestionsController {
  constructor(private quickQuestionsService: QuickQuestionsService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a quick question' })
  @ApiResponse({ status: 201, description: 'Question submitted' })
  async create(@Body() dto: CreateQuickQuestionDto) {
    return this.quickQuestionsService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all quick questions' })
  @ApiResponse({ status: 200, description: 'Returns paginated questions' })
  async findAll(@Query() query: QuickQuestionQueryDto) {
    return this.quickQuestionsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get question by ID' })
  @ApiResponse({ status: 200, description: 'Returns question' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async findById(@Param('id') id: number) {
    return this.quickQuestionsService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update question' })
  @ApiResponse({ status: 200, description: 'Question updated' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async update(@Param('id') id: number, @Body() dto: UpdateQuickQuestionDto) {
    return this.quickQuestionsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete question' })
  @ApiResponse({ status: 200, description: 'Question deleted' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async delete(@Param('id') id: number) {
    return this.quickQuestionsService.delete(id);
  }
}
