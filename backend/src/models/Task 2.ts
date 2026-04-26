import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, AllowNull, Default } from 'sequelize-typescript';
import { toDefaultValue } from 'sequelize/types/utils';

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
    })
}