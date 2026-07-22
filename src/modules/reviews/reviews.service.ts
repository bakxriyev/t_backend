import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Review } from './reviews.model';
import { CreateReviewDto, UpdateReviewDto, ReviewQueryDto } from './reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}

  async findAll(query: ReviewQueryDto) {
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
    const { rows, count } = await this.reviewModel.findAndCountAll({
      where, limit, offset, order: [['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const review = await this.reviewModel.findByPk(id);
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async create(dto: CreateReviewDto, photo?: string) {
    return this.reviewModel.create({ ...dto, photo } as any);
  }

  async update(id: number, dto: UpdateReviewDto, photo?: string) {
    const review = await this.reviewModel.findByPk(id);
    if (!review) throw new NotFoundException('Review not found');
    const updateData: any = { ...dto };
    if (photo) updateData.photo = photo;
    await review.update(updateData);
    return review;
  }

  async delete(id: number) {
    const review = await this.reviewModel.findByPk(id);
    if (!review) throw new NotFoundException('Review not found');
    await review.destroy();
    return { message: 'Review deleted successfully' };
  }
}
