import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'testimonials', timestamps: true })
export class Testimonial extends Model<Testimonial> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_uz: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_ru: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare position_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare position_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare position_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare content_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare content_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare content_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare video_url: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare image: string;

  @Column({ type: DataType.ENUM('text', 'video'), defaultValue: 'text' })
  declare type: 'text' | 'video';

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
