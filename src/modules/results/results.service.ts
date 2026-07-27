import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Result } from './results.model';
import { CreateResultDto, UpdateResultDto, ResultQueryDto } from './results.dto';

@Injectable()
export class ResultsService {
  constructor(@InjectModel(Result) private resultModel: typeof Result) {}

  private parsePhotoUrls(result: Result | null): any {
    if (!result) return result;
    const data: any = result.toJSON();
    const raw = data.photo;
    if (!raw) {
      data.photos = [];
    } else if (raw.startsWith('[')) {
      try {
        data.photos = JSON.parse(raw);
      } catch {
        data.photos = [raw];
      }
    } else {
      data.photos = [raw];
    }
    return data;
  }

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
    const data = rows.map(r => this.parsePhotoUrls(r));
    return { data, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    return this.parsePhotoUrls(result);
  }

  async create(dto: CreateResultDto, photoUrls?: string[]) {
    const createData: any = { ...dto };
    if (photoUrls && photoUrls.length > 0) {
      createData.photo = photoUrls.length === 1 ? photoUrls[0] : JSON.stringify(photoUrls);
    }
    const result = await this.resultModel.create(createData);
    return this.parsePhotoUrls(result);
  }

  async update(id: number, dto: UpdateResultDto, photoUrls?: string[]) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    const updateData: any = { ...dto };
    if (photoUrls && photoUrls.length > 0) {
      updateData.photo = photoUrls.length === 1 ? photoUrls[0] : JSON.stringify(photoUrls);
    }
    await result.update(updateData);
    const updated = await this.resultModel.findByPk(id);
    return this.parsePhotoUrls(updated);
  }

  async delete(id: number) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    await result.destroy();
    return { message: 'Result deleted successfully' };
  }
}
