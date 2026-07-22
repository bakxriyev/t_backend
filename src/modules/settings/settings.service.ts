import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Setting } from './settings.model';
import { UpdateSettingsDto, SettingQueryDto } from './settings.dto';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(Setting) private settingModel: typeof Setting) {}

  async getSettings() {
    let settings = await this.settingModel.findOne();
    if (!settings) {
      settings = await this.settingModel.create({
        site_name_uz: 'Tashkent Law School',
        site_name_ru: 'Tashkent Law School',
        site_name_en: 'Tashkent Law School',
        email: 'info@tls.uz',
        phone: '+998901234567',
        address_uz: 'Toshkent sh.',
        address_ru: 'г. Ташкент',
        address_en: 'Tashkent',
      } as any);
    }
    return settings;
  }

  async update(dto: UpdateSettingsDto, logo?: string, favicon?: string) {
    let settings = await this.settingModel.findOne();
    if (!settings) {
      settings = await this.settingModel.create({} as any);
    }
    const updateData: any = { ...dto };
    if (logo) updateData.logo = logo;
    if (favicon) updateData.favicon = favicon;
    await settings.update(updateData);
    return settings;
  }
}
