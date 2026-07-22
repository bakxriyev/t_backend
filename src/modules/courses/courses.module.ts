import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseApplication } from './courses.model';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [SequelizeModule.forFeature([CourseApplication]), TelegramModule],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
