import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Statistic } from './statistics.model';

@Module({
  imports: [SequelizeModule.forFeature([Statistic])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
