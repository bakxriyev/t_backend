import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamMember } from './team.model';

@Module({
  imports: [SequelizeModule.forFeature([TeamMember])],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
