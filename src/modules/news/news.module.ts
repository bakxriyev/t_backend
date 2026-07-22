import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { News } from './news.model';

@Module({
  imports: [SequelizeModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
