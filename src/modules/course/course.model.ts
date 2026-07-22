import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'courses', timestamps: true })
export class Course extends Model<Course> {
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

  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  declare price: number;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare duration: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare level: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare image: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
