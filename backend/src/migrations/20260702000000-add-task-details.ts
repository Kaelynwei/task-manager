import { DataTypes, QueryInterface } from 'sequelize';

export const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  const table = await queryInterface.describeTable('tasks');

  if (!table.userId) {
    await queryInterface.addColumn('tasks', 'userId', {
      type: DataTypes.INTEGER,
      allowNull: true,
    });
  }

  if (!table.description) {
    await queryInterface.addColumn('tasks', 'description', {
      type: DataTypes.TEXT,
      allowNull: true,
    });
  }

  if (!table.dueDate) {
    await queryInterface.addColumn('tasks', 'dueDate', {
      type: DataTypes.STRING,
      allowNull: true,
    });
  }
};

export const down = async ({ context: queryInterface }: { context: QueryInterface }) => {
  const table = await queryInterface.describeTable('tasks');

  if (table.dueDate) {
    await queryInterface.removeColumn('tasks', 'dueDate');
  }

  if (table.description) {
    await queryInterface.removeColumn('tasks', 'description');
  }

  if (table.userId) {
    await queryInterface.removeColumn('tasks', 'userId');
  }
};