import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { About } from './about.model';

@Module({
  imports: [SequelizeModule.forFeature([About])],
  controllers: [AboutController],
  providers: [AboutService],
  exports: [AboutService],
})
export class AboutModule {}
