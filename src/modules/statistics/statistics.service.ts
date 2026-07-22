import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Statistic } from './statistics.model';
import { CreateStatisticDto, UpdateStatisticDto, StatisticQueryDto } from './statistics.dto';

@Injectable()
export class StatisticsService {
  constructor(@InjectModel(Statistic) private statisticModel: typeof Statistic) {}

  async findActive() {
    return this.statisticModel.findAll({ where: { is_active: true }, order: [['order', 'ASC']] });
  }

  async findAll(query: StatisticQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const offset = (page - 1) * limit;
    const { rows, count } = await this.statisticModel.findAndCountAll({
      limit, offset, order: [['order', 'ASC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const stat = await this.statisticModel.findByPk(id);
    if (!stat) throw new NotFoundException('Statistic not found');
    return stat;
  }

  async create(dto: CreateStatisticDto) {
    return this.statisticModel.create(dto as any);
  }

  async update(id: number, dto: UpdateStatisticDto) {
    const stat = await this.statisticModel.findByPk(id);
    if (!stat) throw new NotFoundException('Statistic not found');
    await stat.update(dto as any);
    return stat;
  }

  async delete(id: number) {
    const stat = await this.statisticModel.findByPk(id);
    if (!stat) throw new NotFoundException('Statistic not found');
    await stat.destroy();
    return { message: 'Statistic deleted successfully' };
  }
}
