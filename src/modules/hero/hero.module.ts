import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';
import { Hero } from './hero.model';

@Module({
  imports: [SequelizeModule.forFeature([Hero])],
  controllers: [HeroController],
  providers: [HeroService],
  exports: [HeroService],
})
export class HeroModule {}
