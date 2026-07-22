import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { News } from './news.model';
import { CreateNewsDto, UpdateNewsDto, NewsQueryDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsModel: typeof News) {}

  async findAll(query: NewsQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (query.search) {
      where[Op.or] = [
        { title_uz: { [Op.like]: `%${query.search}%` } },
        { title_ru: { [Op.like]: `%${query.search}%` } },
        { title_en: { [Op.like]: `%${query.search}%` } },
      ];
    }
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;
    const { rows, count } = await this.newsModel.findAndCountAll({
      where, limit, offset, order: [['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const news = await this.newsModel.findByPk(id);
    if (!news) throw new NotFoundException('News not found');
    await news.update({ views: news.views + 1 });
    return news;
  }

  async create(dto: CreateNewsDto, image?: string) {
    return this.newsModel.create({ ...dto, image } as any);
  }

  async update(id: number, dto: UpdateNewsDto, image?: string) {
    const news = await this.newsModel.findByPk(id);
    if (!news) throw new NotFoundException('News not found');
    const updateData: any = { ...dto };
    if (image) updateData.image = image;
    await news.update(updateData);
    return news;
  }

  async delete(id: number) {
    const news = await this.newsModel.findByPk(id);
    if (!news) throw new NotFoundException('News not found');
    await news.destroy();
    return { message: 'News deleted successfully' };
  }
}
