import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { Result } from './results.model';

@Module({
  imports: [SequelizeModule.forFeature([Result])],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
