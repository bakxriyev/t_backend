import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';
import { FaqItem } from './faq.model';

@Module({
  imports: [SequelizeModule.forFeature([FaqItem])],
  controllers: [FaqController],
  providers: [FaqService],
  exports: [FaqService],
})
export class FaqModule {}
