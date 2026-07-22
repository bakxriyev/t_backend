import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'about_values', timestamps: true })
export class AboutValue extends Model<AboutValue> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  declare key: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_en: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare description_uz: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare description_ru: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare description_en: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
