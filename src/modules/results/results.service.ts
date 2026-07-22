import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Result } from './results.model';
import { CreateResultDto, UpdateResultDto, ResultQueryDto } from './results.dto';

@Injectable()
export class ResultsService {
  constructor(@InjectModel(Result) private resultModel: typeof Result) {}

  async findAll(query: ResultQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (query.search) {
      where[Op.or] = [
        { student_name_uz: { [Op.like]: `%${query.search}%` } },
        { student_name_ru: { [Op.like]: `%${query.search}%` } },
        { student_name_en: { [Op.like]: `%${query.search}%` } },
      ];
    }
    const { rows, count } = await this.resultModel.findAndCountAll({
      where, limit, offset, order: [['year', 'DESC'], ['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    return result;
  }

  async create(dto: CreateResultDto, photo?: string) {
    return this.resultModel.create({ ...dto, photo } as any);
  }

  async update(id: number, dto: UpdateResultDto, photo?: string) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    const updateData: any = { ...dto };
    if (photo) updateData.photo = photo;
    await result.update(updateData);
    return result;
  }

  async delete(id: number) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    await result.destroy();
    return { message: 'Result deleted successfully' };
  }
}
