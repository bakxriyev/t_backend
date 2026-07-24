import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'statistics', timestamps: true })
export class Statistic extends Model<Statistic> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare label_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare label_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare label_en: string;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare value: number;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare icon: string;

  @Column({ type: DataType.STRING(10), allowNull: true, defaultValue: '+' })
  declare suffix: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
