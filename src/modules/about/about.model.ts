import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'abouts', timestamps: true })
export class About extends Model<About> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
declare id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_uz: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_ru: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare mission_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare mission_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare mission_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare vision_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare vision_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare vision_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare image: string;

  @CreatedAt
declare createdAt: Date;

  @UpdatedAt
declare updatedAt: Date;
}
