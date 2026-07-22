import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FaqItem } from './faq.model';
import { CreateFaqItemDto, UpdateFaqItemDto } from './faq.dto';

@Injectable()
export class FaqService {
  constructor(@InjectModel(FaqItem) private faqModel: typeof FaqItem) {}

  async findAll() {
    return this.faqModel.findAll({ order: [['order', 'ASC']] });
  }

  async findById(id: number) {
    const item = await this.faqModel.findByPk(id);
    if (!item) throw new NotFoundException('FAQ item not found');
    return item;
  }

  async create(dto: CreateFaqItemDto) {
    return this.faqModel.create(dto as any);
  }

  async update(id: number, dto: UpdateFaqItemDto) {
    const item = await this.faqModel.findByPk(id);
    if (!item) throw new NotFoundException('FAQ item not found');
    await item.update(dto as any);
    return item;
  }

  async delete(id: number) {
    const item = await this.faqModel.findByPk(id);
    if (!item) throw new NotFoundException('FAQ item not found');
    await item.destroy();
  }
}
