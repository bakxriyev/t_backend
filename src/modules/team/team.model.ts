import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'team_members', timestamps: true })
export class TeamMember extends Model<TeamMember> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare first_name_uz: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare first_name_ru: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare first_name_en: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare last_name_uz: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare last_name_ru: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare last_name_en: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare position_uz: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare position_ru: string;

  @Column({ type: DataType.STRING(500), allowNull: false })
  declare position_en: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare bio_uz: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare bio_ru: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare bio_en: string;

  @Column({ type: DataType.STRING(500), allowNull: true })
  declare photo: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  declare email: string;

  @Column({ type: DataType.STRING(50), allowNull: true })
  declare phone: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare order: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
