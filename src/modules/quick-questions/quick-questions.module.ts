import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuickQuestionsController } from './quick-questions.controller';
import { QuickQuestionsService } from './quick-questions.service';
import { QuickQuestion } from './quick-questions.model';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [SequelizeModule.forFeature([QuickQuestion]), TelegramModule],
  controllers: [QuickQuestionsController],
  providers: [QuickQuestionsService],
  exports: [QuickQuestionsService],
})
export class QuickQuestionsModule {}
