import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SocialLinksService } from './social-links.service';
import { CreateSocialLinkDto, UpdateSocialLinkDto } from './social-links.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Social Links')
@Controller('social-links')
export class SocialLinksController {
  constructor(private socialLinksService: SocialLinksService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all social links' })
  @ApiResponse({ status: 200, description: 'Returns social links list' })
  async findAll() {
    return this.socialLinksService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get social link by ID' })
  @ApiResponse({ status: 200, description: 'Returns social link' })
  @ApiResponse({ status: 404, description: 'Social link not found' })
  async findById(@Param('id') id: number) {
    return this.socialLinksService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create social link' })
  @ApiResponse({ status: 201, description: 'Social link created' })
  async create(@Body() dto: CreateSocialLinkDto) {
    return this.socialLinksService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update social link' })
  @ApiResponse({ status: 200, description: 'Social link updated' })
  @ApiResponse({ status: 404, description: 'Social link not found' })
  async update(@Param('id') id: number, @Body() dto: UpdateSocialLinkDto) {
    return this.socialLinksService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete social link' })
  @ApiResponse({ status: 200, description: 'Social link deleted' })
  @ApiResponse({ status: 404, description: 'Social link not found' })
  async delete(@Param('id') id: number) {
    return this.socialLinksService.delete(id);
  }
}
