import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TelegramService } from './telegram.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Telegram')
@Controller('telegram')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TelegramController {
  constructor(private telegramService: TelegramService) {}

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send custom message via Telegram bot' })
  @ApiResponse({ status: 200, description: 'Message sent' })
  async sendMessage(@Body('text') text: string) {
    await this.telegramService.sendMessage(text);
    return { message: 'Message sent' };
  }
}
