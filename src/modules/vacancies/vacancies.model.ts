import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'vacancies', timestamps: true })
export class Vacancy extends Model<Vacancy> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

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

  @Column({ type: DataType.TEXT, allowNull: true })
  declare requirements_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare requirements_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare requirements_en: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare salary: string;

  @Column({ type: DataType.ENUM('full_time', 'part_time', 'internship'), defaultValue: 'full_time' })
  declare type: 'full_time' | 'part_time' | 'internship';

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
