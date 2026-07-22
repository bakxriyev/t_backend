import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SeoService } from './seo.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('SEO')
@Controller('seo')
export class SeoController {
  constructor(private seoService: SeoService) {}

  @Public()
  @Get('defaults')
  @ApiOperation({ summary: 'Get SEO defaults' })
  @ApiResponse({ status: 200, description: 'Returns SEO settings' })
  async getDefaults() {
    return this.seoService.getDefaults();
  }

  @Put('defaults')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update SEO defaults' })
  @ApiResponse({ status: 200, description: 'SEO settings updated' })
  async updateDefaults(@Body() dto: any) {
    return this.seoService.updateDefaults(dto);
  }
}
