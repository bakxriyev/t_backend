import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { About } from './about.model';
import { CreateAboutDto, UpdateAboutDto } from './about.dto';

@Injectable()
export class AboutService {
  constructor(@InjectModel(About) private aboutModel: typeof About) {}

  async find() {
    let about = await this.aboutModel.findOne();
    if (!about) {
      about = await this.aboutModel.create({
        content_uz: '',
        content_ru: '',
        content_en: '',
      } as any);
    }
    return about;
  }

  async create(dto: CreateAboutDto, image?: string) {
    return this.aboutModel.create({ ...dto, image } as any);
  }

  async update(id: number, dto: UpdateAboutDto, image?: string) {
    const about = await this.aboutModel.findByPk(id);
    if (!about) throw new NotFoundException('About not found');
    const updateData: any = { ...dto };
    if (image) updateData.image = image;
    await about.update(updateData);
    return about;
  }
}
