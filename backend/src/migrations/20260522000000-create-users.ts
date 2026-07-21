import { DataType } from 'sequelize-typescript';
import { QueryInterface } from 'sequelize';
export async function up({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.createTable('users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataType.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  });
}
export async function down({ context: queryInterface }: { context: QueryInterface }) {
  await queryInterface.dropTable('users');
}