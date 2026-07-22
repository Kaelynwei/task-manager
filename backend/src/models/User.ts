import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Task } from './Task';

@Table({
    tableName: 'users',
    timestamps: true, 
  })

export class User extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, 
      })
      username!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, 
        },
      })
      email!: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      passwordHash!: string; 
      
      @HasMany(() => Task)
      tasks!: Task[];
    }

