import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'news', timestamps: true })
export class News extends Model<News> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_en: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_uz: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_ru: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare slug: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare excerpt_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare excerpt_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare excerpt_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare image: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare video_url: string;

  @Column({ type: DataType.ENUM('news', 'article', 'announcement'), defaultValue: 'news' })
  declare type: 'news' | 'article' | 'announcement';

  @Column({ type: DataType.ENUM('published', 'draft'), defaultValue: 'draft' })
  declare status: 'published' | 'draft';

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare views: number;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
