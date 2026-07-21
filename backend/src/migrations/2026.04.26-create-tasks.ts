import { DataTypes, QueryInterface } from 'sequelize';
export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable('tasks', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    /*
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    */
  });
};
export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.dropTable('tasks');
};