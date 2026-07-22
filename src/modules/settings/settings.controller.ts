import { Controller, Get, Put, Body, UseGuards, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './settings.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { multerConfig } from '../upload/multer.config';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get settings' })
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'logo', maxCount: 1 },
      { name: 'favicon', maxCount: 1 },
    ], multerConfig),
  )
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update settings' })
  async update(
    @Body() dto: UpdateSettingsDto,
    @UploadedFiles() files: { logo?: Express.Multer.File[]; favicon?: Express.Multer.File[] },
  ) {
    const logo = files?.logo?.[0] ? `/uploads/${files.logo[0].filename}` : undefined;
    const favicon = files?.favicon?.[0] ? `/uploads/${files.favicon[0].filename}` : undefined;
    return this.settingsService.update(dto, logo, favicon);
  }
}
