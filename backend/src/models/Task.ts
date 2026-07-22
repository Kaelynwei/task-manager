import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({
    tableName: 'tasks',
    timestamps: true, 
})
export class Task extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    title!: string;
  
    @Default(false)
    @Column(DataType.BOOLEAN)
    completed!: boolean;

    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: true, 
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
}