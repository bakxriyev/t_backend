import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AboutValue } from './about-values.model';
import { CreateAboutValueDto, UpdateAboutValueDto } from './about-values.dto';

@Injectable()
export class AboutValuesService {
  constructor(@InjectModel(AboutValue) private model: typeof AboutValue) {}

  async findAll() {
    const items = await this.model.findAll({ order: [['order', 'ASC']] });
    if (items.length === 0) {
      const defaults = [
        { key: 'integrity', title_uz: 'Halollik', title_ru: 'Честность', title_en: 'Integrity', description_uz: "Yuridik ta'lim va amaliyotda eng yuqori axloqiy standartlarni qo'llab-quvvatlash.", description_ru: 'Поддержание высочайших этических стандартов в юридическом образовании и практике.', description_en: 'Upholding the highest ethical standards in legal education and practice.', order: 1 },
        { key: 'excellence', title_uz: 'Mukammallik', title_ru: 'Превосходство', title_en: 'Excellence', description_uz: "Har bir dasturda akademik qat'iyat va professional mahoratga intilish.", description_ru: 'Стремление к академической строгости и профессиональному мастерству в каждой программе.', description_en: 'Striving for academic rigor and professional mastery in every program.', order: 2 },
        { key: 'community', title_uz: 'Hamjamiyat', title_ru: 'Сообщество', title_en: 'Community', description_uz: "Talabalar, bitiruvchilar va yuridik mutaxassislarning qo'llab-quvvatlovchi tarmog'ini qurish.", description_ru: 'Создание сети поддержки студентов, выпускников и юристов.', description_en: 'Building a supportive network of students, alumni, and legal professionals.', order: 3 },
        { key: 'innovation', title_uz: 'Innovatsiya', title_ru: 'Инновации', title_en: 'Innovation', description_uz: "Zamonaviy o'qitish usullari va global huquqiy istiqbollarni qabul qilish.", description_ru: 'Принятие современных методов обучения и глобальных правовых перспектив.', description_en: 'Embracing modern teaching methods and global legal perspectives.', order: 4 },
      ];
      for (const dto of defaults) {
        await this.model.create(dto as any);
      }
      return this.model.findAll({ order: [['order', 'ASC']] });
    }
    return items;
  }

  async findById(id: number) {
    const item = await this.model.findByPk(id);
    if (!item) throw new NotFoundException('About value not found');
    return item;
  }

  async create(dto: CreateAboutValueDto) {
    return this.model.create(dto as any);
  }

  async update(id: number, dto: UpdateAboutValueDto) {
    const item = await this.model.findByPk(id);
    if (!item) throw new NotFoundException('About value not found');
    await item.update(dto as any);
    return item;
  }

  async delete(id: number) {
    const item = await this.model.findByPk(id);
    if (!item) throw new NotFoundException('About value not found');
    await item.destroy();
    return { message: 'Deleted successfully' };
  }
}
