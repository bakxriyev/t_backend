import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SocialLink } from './social-links.model';
import { CreateSocialLinkDto, UpdateSocialLinkDto } from './social-links.dto';

@Injectable()
export class SocialLinksService {
  constructor(@InjectModel(SocialLink) private socialLinkModel: typeof SocialLink) {}

  async findAll() {
    return this.socialLinkModel.findAll({ order: [['order', 'ASC']] });
  }

  async findById(id: number) {
    const link = await this.socialLinkModel.findByPk(id);
    if (!link) throw new NotFoundException('Social link not found');
    return link;
  }

  async create(dto: CreateSocialLinkDto) {
    return this.socialLinkModel.create(dto as any);
  }

  async update(id: number, dto: UpdateSocialLinkDto) {
    const link = await this.socialLinkModel.findByPk(id);
    if (!link) throw new NotFoundException('Social link not found');
    await link.update(dto as any);
    return link;
  }

  async delete(id: number) {
    const link = await this.socialLinkModel.findByPk(id);
    if (!link) throw new NotFoundException('Social link not found');
    await link.destroy();
    return { message: 'Social link deleted successfully' };
  }
}
