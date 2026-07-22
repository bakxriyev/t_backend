import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SocialLinksController } from './social-links.controller';
import { SocialLinksService } from './social-links.service';
import { SocialLink } from './social-links.model';

@Module({
  imports: [SequelizeModule.forFeature([SocialLink])],
  controllers: [SocialLinksController],
  providers: [SocialLinksService],
  exports: [SocialLinksService],
})
export class SocialLinksModule {}
