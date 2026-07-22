import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'social_links', timestamps: true })
export class SocialLink extends Model<SocialLink> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
declare id: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare platform: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare url: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare icon: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;

  @CreatedAt
declare createdAt: Date;

  @UpdatedAt
declare updatedAt: Date;
}
