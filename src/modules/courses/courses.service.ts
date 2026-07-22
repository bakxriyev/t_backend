import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CourseApplication } from './courses.model';
import { CreateCourseApplicationDto, UpdateCourseApplicationDto, CourseApplicationQueryDto } from './courses.dto';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(CourseApplication) private courseModel: typeof CourseApplication) {}

  async findAll(query: CourseApplicationQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (query.search) {
      where[Op.or] = [
        { full_name: { [Op.like]: `%${query.search}%` } },
        { phone: { [Op.like]: `%${query.search}%` } },
      ];
    }
    if (query.status) where.status = query.status;
    const { rows, count } = await this.courseModel.findAndCountAll({
      where, limit, offset, order: [['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const app = await this.courseModel.findByPk(id);
    if (!app) throw new NotFoundException('Application not found');
    return app;
  }

  async create(dto: CreateCourseApplicationDto) {
    return this.courseModel.create(dto as any);
  }

  async update(id: number, dto: UpdateCourseApplicationDto) {
    const app = await this.courseModel.findByPk(id);
    if (!app) throw new NotFoundException('Application not found');
    await app.update(dto as any);
    return app;
  }

  async delete(id: number) {
    const app = await this.courseModel.findByPk(id);
    if (!app) throw new NotFoundException('Application not found');
    await app.destroy();
    return { message: 'Application deleted successfully' };
  }
}
