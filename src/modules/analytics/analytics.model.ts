import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, Unique } from 'sequelize-typescript';

@Table({ tableName: 'site_analytics', timestamps: true })
export class SiteAnalytic extends Model<SiteAnalytic> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
declare id: number;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare page: string;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  declare visitors: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare date: string;

  @CreatedAt
declare createdAt: Date;

  @UpdatedAt
declare updatedAt: Date;
}
