import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hero } from './hero.model';
import { CreateHeroDto, UpdateHeroDto, HeroQueryDto } from './hero.dto';

@Injectable()
export class HeroService {
  constructor(@InjectModel(Hero) private heroModel: typeof Hero) {}

  async findAll(query: HeroQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (query.is_active !== undefined) where.is_active = query.is_active;
    const { rows, count } = await this.heroModel.findAndCountAll({
      where, limit, offset, order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const hero = await this.heroModel.findByPk(id);
    if (!hero) throw new NotFoundException('Hero not found');
    return hero;
  }

  async create(dto: CreateHeroDto, image?: string) {
    return this.heroModel.create({ ...dto, image } as any);
  }

  async update(id: number, dto: UpdateHeroDto, image?: string) {
    const hero = await this.heroModel.findByPk(id);
    if (!hero) throw new NotFoundException('Hero not found');
    const updateData: any = { ...dto };
    if (image) updateData.image = image;
    await hero.update(updateData);
    return hero;
  }

  async delete(id: number) {
    const hero = await this.heroModel.findByPk(id);
    if (!hero) throw new NotFoundException('Hero not found');
    await hero.destroy();
    return { message: 'Hero deleted successfully' };
  }
}
