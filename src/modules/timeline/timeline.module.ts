import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimelineController } from './timeline.controller';
import { TimelineService } from './timeline.service';
import { TimelineItem } from './timeline.model';

@Module({
  imports: [SequelizeModule.forFeature([TimelineItem])],
  controllers: [TimelineController],
  providers: [TimelineService],
  exports: [TimelineService],
})
export class TimelineModule {}
