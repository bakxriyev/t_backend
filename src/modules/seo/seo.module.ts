import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';
import { Setting } from '../settings/settings.model';

@Module({
  imports: [SequelizeModule.forFeature([Setting])],
  controllers: [SeoController],
  providers: [SeoService],
})
export class SeoModule {}
