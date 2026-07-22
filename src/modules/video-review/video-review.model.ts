import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'video_reviews', timestamps: true })
export class VideoReview extends Model<VideoReview> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_uz: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_ru: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare video: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
