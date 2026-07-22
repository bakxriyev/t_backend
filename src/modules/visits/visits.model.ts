import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'visits', timestamps: true, createdAt: 'visited_at', updatedAt: false })
export class Visit extends Model<Visit> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare page: string;

  @Column({ type: DataType.STRING(45), allowNull: true })
  declare ip_address: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare user_agent: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare country: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare region: string;

  @Column({ type: DataType.STRING(100), allowNull: true })
  declare city: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  declare latitude: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  declare longitude: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare referrer: string;

  @Column({ type: DataType.DATE })
  declare visited_at: Date;
}
