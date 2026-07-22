import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { VideoReview } from './video-review.model';
import { CreateVideoReviewDto, UpdateVideoReviewDto, VideoReviewQueryDto } from './video-review.dto';

@Injectable()
export class VideoReviewService {
  constructor(@InjectModel(VideoReview) private videoReviewModel: typeof VideoReview) {}

  async findAll(query: VideoReviewQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (query.search) {
      where[Op.or] = [
        { name_uz: { [Op.like]: `%${query.search}%` } },
        { name_ru: { [Op.like]: `%${query.search}%` } },
        { name_en: { [Op.like]: `%${query.search}%` } },
      ];
    }
    const { rows, count } = await this.videoReviewModel.findAndCountAll({
      where, limit, offset, order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const item = await this.videoReviewModel.findByPk(id);
    if (!item) throw new NotFoundException('Video review not found');
    return item;
  }

  async create(dto: CreateVideoReviewDto, video?: string) {
    return this.videoReviewModel.create({ ...dto, video } as any);
  }

  async update(id: number, dto: UpdateVideoReviewDto, video?: string) {
    const item = await this.videoReviewModel.findByPk(id);
    if (!item) throw new NotFoundException('Video review not found');
    const updateData: any = { ...dto };
    if (video) updateData.video = video;
    await item.update(updateData);
    return item;
  }

  async delete(id: number) {
    const item = await this.videoReviewModel.findByPk(id);
    if (!item) throw new NotFoundException('Video review not found');
    await item.destroy();
    return { message: 'Video review deleted successfully' };
  }
}
