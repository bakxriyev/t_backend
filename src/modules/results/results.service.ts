import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Result } from './results.model';
import { CreateResultDto, UpdateResultDto, ResultQueryDto } from './results.dto';

@Injectable()
export class ResultsService {
  constructor(@InjectModel(Result) private resultModel: typeof Result) {}

  private parsePhotos(result: Result | null): any {
    if (!result) return result;
    const data: any = result.toJSON();
    try {
      data.photos = data.photos ? JSON.parse(data.photos) : (data.photo ? [data.photo] : []);
    } catch {
      data.photos = data.photo ? [data.photo] : [];
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
    const data = rows.map(r => this.parsePhotos(r));
    return { data, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    return this.parsePhotos(result);
  }

  async create(dto: CreateResultDto, photoUrls?: string[]) {
    const createData: any = { ...dto };
    if (photoUrls && photoUrls.length > 0) {
      createData.photo = photoUrls[0];
      createData.photos = JSON.stringify(photoUrls);
    }
    const result = await this.resultModel.create(createData);
    return this.parsePhotos(result);
  }

  async update(id: number, dto: UpdateResultDto, photoUrls?: string[]) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    const updateData: any = { ...dto };
    if (photoUrls && photoUrls.length > 0) {
      updateData.photo = photoUrls[0];
      updateData.photos = JSON.stringify(photoUrls);
    }
    await result.update(updateData);
    const updated = await this.resultModel.findByPk(id);
    return this.parsePhotos(updated);
  }

  async delete(id: number) {
    const result = await this.resultModel.findByPk(id);
    if (!result) throw new NotFoundException('Result not found');
    await result.destroy();
    return { message: 'Result deleted successfully' };
  }
}
