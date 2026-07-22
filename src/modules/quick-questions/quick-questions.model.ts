import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'quick_questions', timestamps: true })
export class QuickQuestion extends Model<QuickQuestion> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare full_name: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare phone: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare question: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare answer: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_answered: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
