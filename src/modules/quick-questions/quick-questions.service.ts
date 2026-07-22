import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { QuickQuestion } from './quick-questions.model';
import { CreateQuickQuestionDto, UpdateQuickQuestionDto, QuickQuestionQueryDto } from './quick-questions.dto';

@Injectable()
export class QuickQuestionsService {
  constructor(@InjectModel(QuickQuestion) private questionModel: typeof QuickQuestion) {}

  async findAll(query: QuickQuestionQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;
    const where: any = {};
    if (query.search) {
      where[Op.or] = [
        { full_name: { [Op.like]: `%${query.search}%` } },
        { phone: { [Op.like]: `%${query.search}%` } },
      ];
    }
    const { rows, count } = await this.questionModel.findAndCountAll({
      where, limit, offset, order: [['createdAt', 'DESC']],
    });
    return { data: rows, total: count, page, limit, totalPages: Math.ceil(count / limit) };
  }

  async findById(id: number) {
    const question = await this.questionModel.findByPk(id);
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async create(dto: CreateQuickQuestionDto) {
    return this.questionModel.create(dto as any);
  }

  async update(id: number, dto: UpdateQuickQuestionDto) {
    const question = await this.questionModel.findByPk(id);
    if (!question) throw new NotFoundException('Question not found');
    await question.update(dto as any);
    return question;
  }

  async delete(id: number) {
    const question = await this.questionModel.findByPk(id);
    if (!question) throw new NotFoundException('Question not found');
    await question.destroy();
    return { message: 'Question deleted successfully' };
  }
}
