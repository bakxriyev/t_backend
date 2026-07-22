import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Teacher } from './teachers.model';
import { CreateTeacherDto, UpdateTeacherDto, TeacherQueryDto } from './teachers.dto';

@Injectable()
export class TeachersService {
  constructor(@InjectModel(Teacher) private teacherModel: typeof Teacher) {}

  async findAll(query: TeacherQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (query.search) {
      where[Op.or] = [
        { first_name_uz: { [Op.like]: `%${query.search}%` } },
        { first_name_ru: { [Op.like]: `%${query.search}%` } },
        { first_name_en: { [Op.like]: `%${query.search}%` } },
        { last_name_uz: { [Op.like]: `%${query.search}%` } },
        { last_name_ru: { [Op.like]: `%${query.search}%` } },
        { last_name_en: { [Op.like]: `%${query.search}%` } },
      ];
    }
    if (query.is_active !== undefined) where.is_active = query.is_active;
    const { rows, count } = await this.teacherModel.findAndCountAll({
      where, limit, offset, order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const teacher = await this.teacherModel.findByPk(id);
    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  async create(dto: CreateTeacherDto, photo?: string) {
    return this.teacherModel.create({ ...dto, photo } as any);
  }

  async update(id: number, dto: UpdateTeacherDto, photo?: string) {
    const teacher = await this.teacherModel.findByPk(id);
    if (!teacher) throw new NotFoundException('Teacher not found');
    const updateData: any = { ...dto };
    if (photo) updateData.photo = photo;
    await teacher.update(updateData);
    return teacher;
  }

  async delete(id: number) {
    const teacher = await this.teacherModel.findByPk(id);
    if (!teacher) throw new NotFoundException('Teacher not found');
    await teacher.destroy();
    return { message: 'Teacher deleted successfully' };
  }
}
