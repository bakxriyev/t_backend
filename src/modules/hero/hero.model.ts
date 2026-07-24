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

  // === Text styling fields ===
  @Column({ type: DataType.STRING(20), allowNull: true, defaultValue: '4.5rem' })
  declare title_font_size: string;

  @Column({ type: DataType.STRING(20), allowNull: true, defaultValue: '1.125rem' })
  declare subtitle_font_size: string;

  @Column({ type: DataType.STRING(20), allowNull: true, defaultValue: '1rem' })
  declare description_font_size: string;

  @Column({ type: DataType.STRING(10), allowNull: true, defaultValue: '700' })
  declare title_font_weight: string;

  @Column({ type: DataType.STRING(10), allowNull: true, defaultValue: '400' })
  declare subtitle_font_weight: string;

  @Column({ type: DataType.STRING(10), allowNull: true, defaultValue: '400' })
  declare description_font_weight: string;

  @Column({ type: DataType.STRING(20), allowNull: true, defaultValue: 'center' })
  declare text_align: string;

  @Column({ type: DataType.STRING(20), allowNull: true, defaultValue: '100%' })
  declare max_width: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
