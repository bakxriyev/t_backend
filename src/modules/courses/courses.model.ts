import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'course_applications', timestamps: true })
export class CourseApplication extends Model<CourseApplication> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare full_name: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare phone: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare email: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare course_name: string;

  @Column({ type: DataType.ENUM('new', 'contacted', 'registered', 'closed'), defaultValue: 'new' })
  declare status: 'new' | 'contacted' | 'registered' | 'closed';

  @Column({ type: DataType.TEXT, allowNull: true })
  declare notes: string;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
