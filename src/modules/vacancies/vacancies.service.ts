import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Vacancy } from './vacancies.model';
import { CreateVacancyDto, UpdateVacancyDto, VacancyQueryDto } from './vacancies.dto';

@Injectable()
export class VacanciesService {
  constructor(@InjectModel(Vacancy) private vacancyModel: typeof Vacancy) {}

  async findAll(query: VacancyQueryDto) {
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
    const { rows, count } = await this.vacancyModel.findAndCountAll({
      where, limit, offset, order: [['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const vacancy = await this.vacancyModel.findByPk(id);
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    return vacancy;
  }

  async create(dto: CreateVacancyDto) {
    return this.vacancyModel.create(dto as any);
  }

  async update(id: number, dto: UpdateVacancyDto) {
    const vacancy = await this.vacancyModel.findByPk(id);
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    await vacancy.update(dto as any);
    return vacancy;
  }

  async delete(id: number) {
    const vacancy = await this.vacancyModel.findByPk(id);
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    await vacancy.destroy();
    return { message: 'Vacancy deleted successfully' };
  }
}
