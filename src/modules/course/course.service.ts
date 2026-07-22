import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Course } from './course.model';
import { CreateCourseDto, UpdateCourseDto, CourseQueryDto } from './course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course) private courseModel: typeof Course) {}

  async findAll(query: CourseQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (query.search) {
      where[Op.or] = [
        { title_uz: { [Op.like]: `%${query.search}%` } },
        { title_ru: { [Op.like]: `%${query.search}%` } },
        { title_en: { [Op.like]: `%${query.search}%` } },
        { description_uz: { [Op.like]: `%${query.search}%` } },
        { description_ru: { [Op.like]: `%${query.search}%` } },
        { description_en: { [Op.like]: `%${query.search}%` } },
      ];
    }
    if (query.is_active !== undefined) where.is_active = query.is_active;
    const { rows, count } = await this.courseModel.findAndCountAll({
      where, limit, offset, order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const course = await this.courseModel.findByPk(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async create(dto: CreateCourseDto, image?: string) {
    return this.courseModel.create({ ...dto, image } as any);
  }

  async update(id: number, dto: UpdateCourseDto, image?: string) {
    const course = await this.courseModel.findByPk(id);
    if (!course) throw new NotFoundException('Course not found');
    const updateData: any = { ...dto };
    if (image) updateData.image = image;
    await course.update(updateData);
    return course;
  }

  async delete(id: number) {
    const course = await this.courseModel.findByPk(id);
    if (!course) throw new NotFoundException('Course not found');
    await course.destroy();
    return { message: 'Course deleted successfully' };
  }
}
