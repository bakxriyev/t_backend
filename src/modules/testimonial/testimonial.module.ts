import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestimonialController } from './testimonial.controller';
import { TestimonialService } from './testimonial.service';
import { Testimonial } from './testimonial.model';

@Module({
  imports: [SequelizeModule.forFeature([Testimonial])],
  controllers: [TestimonialController],
  providers: [TestimonialService],
  exports: [TestimonialService],
})
export class TestimonialModule {}
