import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'reviews', timestamps: true })
export class Review extends Model<Review> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_uz: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_ru: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name_en: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare position_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare position_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare position_en: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_uz: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_ru: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content_en: string;

  @Column({ type: DataType.INTEGER, defaultValue: 5 })
  declare rating: number;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare photo: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
