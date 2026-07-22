import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { TeamMember } from './team.model';
import { CreateTeamMemberDto, UpdateTeamMemberDto, TeamMemberQueryDto } from './team.dto';

@Injectable()
export class TeamService {
  constructor(@InjectModel(TeamMember) private teamModel: typeof TeamMember) {}

  async findAll(query: TeamMemberQueryDto) {
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
    const { rows, count } = await this.teamModel.findAndCountAll({
      where, limit, offset, order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const member = await this.teamModel.findByPk(id);
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  async create(dto: CreateTeamMemberDto, photo?: string) {
    return this.teamModel.create({ ...dto, photo } as any);
  }

  async update(id: number, dto: UpdateTeamMemberDto, photo?: string) {
    const member = await this.teamModel.findByPk(id);
    if (!member) throw new NotFoundException('Team member not found');
    const updateData: any = { ...dto };
    if (photo) updateData.photo = photo;
    await member.update(updateData);
    return member;
  }

  async delete(id: number) {
    const member = await this.teamModel.findByPk(id);
    if (!member) throw new NotFoundException('Team member not found');
    await member.destroy();
    return { message: 'Team member deleted successfully' };
  }
}
