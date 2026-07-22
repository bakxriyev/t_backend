import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'settings', timestamps: true })
export class Setting extends Model<Setting> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare site_name_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare site_name_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare site_name_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare logo: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare favicon: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare phone: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare address_uz: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare address_ru: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare address_en: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare working_hours_uz: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare working_hours_ru: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare working_hours_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare seo_title_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare seo_title_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare seo_title_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare seo_description_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare seo_description_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare seo_description_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare seo_keywords_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare seo_keywords_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare seo_keywords_en: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
