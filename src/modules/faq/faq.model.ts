import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'faq_items', timestamps: true })
export class FaqItem extends Model<FaqItem> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  declare question_uz: string;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  declare question_ru: string;

  @Column({ type: DataType.STRING(1000), allowNull: false })
  declare question_en: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare answer_uz: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare answer_ru: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare answer_en: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
