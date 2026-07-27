import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'results', timestamps: true })
export class Result extends Model<Result> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare student_name_uz: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare student_name_ru: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare student_name_en: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare achievement_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare achievement_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare achievement_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_en: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare year: number;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare photo: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare photos: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
