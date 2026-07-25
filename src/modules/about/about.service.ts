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
    const data = about.toJSON() as any;
    if (data.images && typeof data.images === 'string') {
      try { data.images = JSON.parse(data.images); } catch { data.images = data.image ? [data.image] : []; }
    } else {
      data.images = data.image ? [data.image] : [];
    }
    if (data.videos && typeof data.videos === 'string') {
      try { data.videos = JSON.parse(data.videos); } catch { data.videos = []; }
    } else {
      data.videos = [];
    }
    data.image = data.images?.[0] || data.image || null;
    return data;
  }

  async create(dto: CreateAboutDto, imagePaths: string[], videoPaths: string[]) {
    const allImages = imagePaths.length > 0 ? imagePaths : [];
    const allVideos = videoPaths.length > 0 ? videoPaths : [];
    const created = await this.aboutModel.create({
      ...dto,
      image: allImages[0] || null,
      images: allImages.length > 0 ? JSON.stringify(allImages) : null,
      videos: allVideos.length > 0 ? JSON.stringify(allVideos) : null,
    } as any);
    const data = created.toJSON() as any;
    data.images = allImages;
    data.videos = allVideos;
    return data;
  }

  async update(id: number, dto: UpdateAboutDto, allImages: string[], allVideos: string[]) {
    const about = await this.aboutModel.findByPk(id);
    if (!about) throw new NotFoundException('About not found');
    const updateData: any = { ...dto };
    updateData.image = allImages[0] || null;
    updateData.images = allImages.length > 0 ? JSON.stringify(allImages) : null;
    updateData.videos = allVideos.length > 0 ? JSON.stringify(allVideos) : null;
    await about.update(updateData);
    const data = about.toJSON() as any;
    data.images = allImages;
    data.videos = allVideos;
    data.image = allImages[0] || data.image || null;
    return data;
  }
}
