import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';
import { Visit } from './visits.model';

@Module({
  imports: [SequelizeModule.forFeature([Visit])],
  controllers: [VisitsController],
  providers: [VisitsService],
  exports: [VisitsService],
})
export class VisitsModule {}
