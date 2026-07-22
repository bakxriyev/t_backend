import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { SiteAnalytic } from './analytics.model';
import { CreateAnalyticDto, AnalyticQueryDto } from './analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(@InjectModel(SiteAnalytic) private analyticModel: typeof SiteAnalytic) {}

  async trackVisit(dto: CreateAnalyticDto) {
    const existing = await this.analyticModel.findOne({
      where: { page: dto.page, date: dto.date },
    });
    if (existing) {
      await existing.update({ visitors: existing.visitors + (dto.visitors || 1) });
      return existing;
    }
    return this.analyticModel.create({
      page: dto.page,
      date: dto.date,
      visitors: dto.visitors || 1,
    } as any);
  }

  async getAnalytics(query: AnalyticQueryDto) {
    const where: any = {};
    if (query.page) where.page = query.page;
    if (query.startDate && query.endDate) {
      where.date = { [Op.between]: [query.startDate, query.endDate] };
    } else if (query.startDate) {
      where.date = { [Op.gte]: query.startDate };
    } else if (query.endDate) {
      where.date = { [Op.lte]: query.endDate };
    }
    return this.analyticModel.findAll({ where, order: [['date', 'DESC']] });
  }

  async getSummary() {
    const totalVisitors = await this.analyticModel.sum('visitors');
    const totalPages = await this.analyticModel.count({
      distinct: true, col: 'page',
    });
    const today = new Date().toISOString().split('T')[0];
    const todayVisitors = await this.analyticModel.sum('visitors', {
      where: { date: today },
    });
    return { totalVisitors: totalVisitors || 0, totalPages, todayVisitors: todayVisitors || 0 };
  }
}
