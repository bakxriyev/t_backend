import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'heroes', timestamps: true })
export class Hero extends Model<Hero> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare title_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare subtitle_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare subtitle_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare subtitle_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description_en: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare button_text_uz: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare button_text_ru: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare button_text_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare button_link: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare image: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare video_url: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
