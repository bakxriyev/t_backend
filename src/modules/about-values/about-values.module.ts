import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AboutValuesController } from './about-values.controller';
import { AboutValuesService } from './about-values.service';
import { AboutValue } from './about-values.model';

@Module({
  imports: [SequelizeModule.forFeature([AboutValue])],
  controllers: [AboutValuesController],
  providers: [AboutValuesService],
  exports: [AboutValuesService],
})
export class AboutValuesModule {}
