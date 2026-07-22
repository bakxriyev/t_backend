import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VideoReviewController } from './video-review.controller';
import { VideoReviewService } from './video-review.service';
import { VideoReview } from './video-review.model';

@Module({
  imports: [SequelizeModule.forFeature([VideoReview])],
  controllers: [VideoReviewController],
  providers: [VideoReviewService],
  exports: [VideoReviewService],
})
export class VideoReviewModule {}
