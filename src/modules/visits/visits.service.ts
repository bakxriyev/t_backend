import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, fn, col, literal } from 'sequelize';
import { Visit } from './visits.model';
import { TrackVisitDto, VisitStatsQueryDto, VisitsListQueryDto, UpdateVisitLocationDto } from './visits.dto';

@Injectable()
export class VisitsService {
  constructor(@InjectModel(Visit) private visitModel: typeof Visit) {}

  async track(dto: TrackVisitDto) {
    return this.visitModel.create({
      page: dto.page,
      ip_address: dto.ip_address || null,
      user_agent: dto.user_agent || null,
      country: dto.country || null,
      region: dto.region || null,
      city: dto.city || null,
      latitude: dto.latitude || null,
      longitude: dto.longitude || null,
      referrer: dto.referrer || null,
    } as any);
  }

  async getStats(query: VisitStatsQueryDto) {
    const where: any = {};
    if (query.startDate && query.endDate) {
      where.visited_at = { [Op.between]: [new Date(query.startDate), new Date(query.endDate)] };
    } else if (query.startDate) {
      where.visited_at = { [Op.gte]: new Date(query.startDate) };
    } else if (query.endDate) {
      where.visited_at = { [Op.lte]: new Date(query.endDate) };
    }

    const totalVisits = await this.visitModel.count({ where });
    const uniqueIps = await this.visitModel.count({ where, distinct: true, col: 'ip_address' });
    const totalPages = await this.visitModel.count({
      where,
      distinct: true,
      col: 'page',
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayVisits = await this.visitModel.count({
      where: { ...where, visited_at: { [Op.gte]: todayStart } },
    });

    const pageViews = await this.visitModel.findAll({
      where,
      attributes: ['page', [fn('COUNT', col('id')), 'views']],
      group: ['page'],
      order: [[literal('views'), 'DESC']],
      limit: 10,
    });

    const dailyStats = await this.visitModel.findAll({
      where,
      attributes: [
        [fn('DATE', col('visited_at')), 'date'],
        [fn('COUNT', col('id')), 'count'],
        [fn('COUNT', fn('DISTINCT', col('ip_address'))), 'unique'],
      ],
      group: [fn('DATE', col('visited_at'))],
      order: [[fn('DATE', col('visited_at')), 'ASC']],
      limit: 30,
    });

    return {
      totalVisits,
      uniqueIps,
      totalPages,
      todayVisits,
      pageViews: pageViews.map((p: any) => ({
        page: p.getDataValue('page'),
        views: parseInt(p.getDataValue('views'), 10),
      })),
      dailyStats: dailyStats.map((d: any) => ({
        date: d.getDataValue('date'),
        count: parseInt(d.getDataValue('count'), 10),
        unique: parseInt(d.getDataValue('unique'), 10),
      })),
    };
  }

  async getRegionStats(query: VisitStatsQueryDto) {
    const where: any = {};
    if (query.startDate && query.endDate) {
      where.visited_at = { [Op.between]: [new Date(query.startDate), new Date(query.endDate)] };
    } else if (query.startDate) {
      where.visited_at = { [Op.gte]: new Date(query.startDate) };
    } else if (query.endDate) {
      where.visited_at = { [Op.lte]: new Date(query.endDate) };
    }

    const withRegion = { ...where, region: { [Op.ne]: null } };
    const withoutRegion = { ...where, region: null };

    const regionStats = await this.visitModel.findAll({
      where: withRegion,
      attributes: [
        'region',
        'city',
        [fn('COUNT', col('id')), 'count'],
        [fn('COUNT', fn('DISTINCT', col('ip_address'))), 'unique'],
      ],
      group: ['region', 'city'],
      order: [[literal('count'), 'DESC']],
      limit: 50,
    });

    const unknownVisits = await this.visitModel.count({ where: withoutRegion });
    const totalWithRegion = await this.visitModel.count({ where: withRegion });

    return {
      regions: regionStats.map((r: any) => ({
        region: r.getDataValue('region'),
        city: r.getDataValue('city'),
        count: parseInt(r.getDataValue('count'), 10),
        unique: parseInt(r.getDataValue('unique'), 10),
      })),
      unknownVisits,
      totalWithRegion,
    };
  }

  async updateLocation(id: number, dto: UpdateVisitLocationDto) {
    const visit = await this.visitModel.findByPk(id);
    if (!visit) throw new NotFoundException('Visit not found');

    const updateData: any = {
      latitude: dto.latitude ?? visit.latitude,
      longitude: dto.longitude ?? visit.longitude,
    };

    if (dto.country !== undefined) updateData.country = dto.country;
    if (dto.region !== undefined) updateData.region = dto.region;
    if (dto.city !== undefined) updateData.city = dto.city;

    const hasLatLng = !!(dto.latitude || dto.longitude);
    const hasExplicitLocation = !!(dto.country || dto.region || dto.city);
    if (hasLatLng && !hasExplicitLocation) {
      const lat = dto.latitude || visit.latitude;
      const lng = dto.longitude || visit.longitude;
      if (lat && lng) {
        try {
          const geo = await this.reverseGeocode(lat, lng);
          if (geo) {
            if (geo.country) updateData.country = geo.country;
            if (geo.region) updateData.region = geo.region;
            if (geo.city) updateData.city = geo.city;
          }
        } catch {
          // geocoding failure — lat/lng already saved
        }
      }
    }

    await visit.update(updateData);
    return visit;
  }

  private async reverseGeocode(lat: string, lng: string): Promise<{ country: string; region: string; city: string } | null> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&format=json&accept-language=uz`,
        { headers: { 'User-Agent': 'TashkentLawSchool/1.0' } },
      );
      if (!res.ok) return null;
      const data: any = await res.json();
      const addr = data.address || {};
      return {
        country: addr.country || null,
        region: addr.state || addr.region || null,
        city: addr.city || addr.town || addr.village || addr.municipality || null,
      };
    } catch {
      return null;
    }
  }

  async getVisitsList(query: VisitsListQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const offset = (page - 1) * limit;

    const { rows, count } = await this.visitModel.findAndCountAll({
      limit,
      offset,
      order: [['visited_at', 'DESC']],
    });

    return {
      data: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }
}
