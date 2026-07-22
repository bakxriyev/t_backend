import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Setting } from '../settings/settings.model';

@Injectable()
export class SeoService {
  constructor(
    @InjectModel(Setting) private settingModel: typeof Setting,
  ) {}

  async getDefaults() {
    let settings = await this.settingModel.findOne();
    if (!settings) {
      settings = await this.settingModel.create({} as any);
    }
    return {
      seo_title: {
        value_uz: settings.seo_title_uz || '',
        value_ru: settings.seo_title_ru || '',
        value_en: settings.seo_title_en || '',
      },
      seo_description: {
        value_uz: settings.seo_description_uz || '',
        value_ru: settings.seo_description_ru || '',
        value_en: settings.seo_description_en || '',
      },
      seo_keywords: {
        value_uz: settings.seo_keywords_uz || '',
        value_ru: settings.seo_keywords_ru || '',
        value_en: settings.seo_keywords_en || '',
      },
    };
  }

  async updateDefaults(dto: any) {
    let settings = await this.settingModel.findOne();
    if (!settings) {
      settings = await this.settingModel.create({} as any);
    }
    if (dto.seo_title) {
      if (dto.seo_title.value_uz !== undefined) settings.seo_title_uz = dto.seo_title.value_uz;
      if (dto.seo_title.value_ru !== undefined) settings.seo_title_ru = dto.seo_title.value_ru;
      if (dto.seo_title.value_en !== undefined) settings.seo_title_en = dto.seo_title.value_en;
    }
    if (dto.seo_description) {
      if (dto.seo_description.value_uz !== undefined) settings.seo_description_uz = dto.seo_description.value_uz;
      if (dto.seo_description.value_ru !== undefined) settings.seo_description_ru = dto.seo_description.value_ru;
      if (dto.seo_description.value_en !== undefined) settings.seo_description_en = dto.seo_description.value_en;
    }
    if (dto.seo_keywords) {
      if (dto.seo_keywords.value_uz !== undefined) settings.seo_keywords_uz = dto.seo_keywords.value_uz;
      if (dto.seo_keywords.value_ru !== undefined) settings.seo_keywords_ru = dto.seo_keywords.value_ru;
      if (dto.seo_keywords.value_en !== undefined) settings.seo_keywords_en = dto.seo_keywords.value_en;
    }
    await settings.save();
    return this.getDefaults();
  }
}
