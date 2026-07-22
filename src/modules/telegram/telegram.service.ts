import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CourseApplication } from '../courses/courses.model';
import { QuickQuestion } from '../quick-questions/quick-questions.model';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private botToken: string;
  private chatId: string;

  constructor(private configService: ConfigService) {
    this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN', '');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID', '');
  }

  async sendMessage(text: string): Promise<void> {
    if (!this.botToken || !this.chatId) {
      this.logger.warn('Telegram bot token or chat ID not configured');
      return;
    }
    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text,
          parse_mode: 'HTML',
        }),
      });
      if (!response.ok) {
        this.logger.error(`Telegram API error: ${response.statusText}`);
      }
    } catch (error) {
      this.logger.error('Failed to send Telegram message', error);
    }
  }

  async sendCourseNotification(application: CourseApplication): Promise<void> {
    const text = `
<b>📝 Yangi kursga ariza</b>
<b>Ism:</b> ${application.full_name}
<b>Telefon:</b> ${application.phone}
<b>Kurs:</b> ${application.course_name}
<b>Vaqt:</b> ${application.createdAt}
    `.trim();
    await this.sendMessage(text);
  }

  async sendQuestionNotification(question: QuickQuestion): Promise<void> {
    const text = `
<b>❓ Yangi savol</b>
<b>Ism:</b> ${question.full_name}
<b>Telefon:</b> ${question.phone}
<b>Savol:</b> ${question.question}
<b>Vaqt:</b> ${question.createdAt}
    `.trim();
    await this.sendMessage(text);
  }
}
