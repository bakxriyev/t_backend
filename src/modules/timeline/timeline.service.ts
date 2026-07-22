import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TimelineItem } from './timeline.model';
import { CreateTimelineItemDto, UpdateTimelineItemDto } from './timeline.dto';

@Injectable()
export class TimelineService {
  constructor(@InjectModel(TimelineItem) private timelineModel: typeof TimelineItem) {}

  async findAll() {
    return this.timelineModel.findAll({ order: [['order', 'ASC']] });
  }

  async findById(id: number) {
    const item = await this.timelineModel.findByPk(id);
    if (!item) throw new NotFoundException('Timeline item not found');
    return item;
  }

  async create(dto: CreateTimelineItemDto) {
    return this.timelineModel.create(dto as any);
  }

  async update(id: number, dto: UpdateTimelineItemDto) {
    const item = await this.timelineModel.findByPk(id);
    if (!item) throw new NotFoundException('Timeline item not found');
    await item.update(dto as any);
    return item;
  }

  async delete(id: number) {
    const item = await this.timelineModel.findByPk(id);
    if (!item) throw new NotFoundException('Timeline item not found');
    await item.destroy();
  }
}
