import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Testimonial } from './testimonial.model';
import { CreateTestimonialDto, UpdateTestimonialDto, TestimonialQueryDto } from './testimonial.dto';

@Injectable()
export class TestimonialService {
  constructor(@InjectModel(Testimonial) private testimonialModel: typeof Testimonial) {}

  async findAll(query: TestimonialQueryDto) {
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
    if (query.type) {
      where.type = query.type;
    }
    const { rows, count } = await this.testimonialModel.findAndCountAll({
      where, limit, offset, order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const testimonial = await this.testimonialModel.findByPk(id);
    if (!testimonial) throw new NotFoundException('Testimonial not found');
    return testimonial;
  }

  async create(dto: CreateTestimonialDto, image?: string) {
    return this.testimonialModel.create({ ...dto, image } as any);
  }

  async update(id: number, dto: UpdateTestimonialDto, image?: string) {
    const testimonial = await this.testimonialModel.findByPk(id);
    if (!testimonial) throw new NotFoundException('Testimonial not found');
    const updateData: any = { ...dto };
    if (image) updateData.image = image;
    await testimonial.update(updateData);
    return testimonial;
  }

  async delete(id: number) {
    const testimonial = await this.testimonialModel.findByPk(id);
    if (!testimonial) throw new NotFoundException('Testimonial not found');
    await testimonial.destroy();
    return { message: 'Testimonial deleted successfully' };
  }
}
