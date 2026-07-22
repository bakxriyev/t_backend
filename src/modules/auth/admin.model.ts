import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'admins', timestamps: true })
export class Admin extends Model<Admin> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare password: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare full_name: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare avatar: string;

  @Column({ type: DataType.ENUM('SUPER_ADMIN', 'ADMIN'), defaultValue: 'ADMIN' })
  declare role: 'SUPER_ADMIN' | 'ADMIN';

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
