import { Task } from '../models/Task';

// Fetch all tasks that belong to the authenticated user
export const getAllTasks = async (
  userId: number
): Promise<Task[]> => {
  return await Task.findAll({
    where: { userId }
  });
};

// Fetch one task by id and userId to prevent users from accessing other users' tasks
export const getTaskById = async (
  id: number,
  userId: number
): Promise<Task | null> => {
  return await Task.findOne({
    where: {
      id,
      userId
    }
  });
};

// Create a new task and link it to the authenticated user
export const createTask = async (
  title: string,
  userId: number,
  description?: string,
  dueDate?: string
): Promise<Task> => {
  return await Task.create({
    title,
    completed: false,
    userId,
    description: description || '',
    dueDate: dueDate || null
  });
};

export const updateTask = async (
  id: number,
  userId: number,
  updateData: {
    title?: string;
    description?: string;
    dueDate?: string;
    completed?: boolean;
  }
): Promise<Task | null> => {
  const task = await Task.findOne({
    where: {
      id,
      userId
    }
  });

  if (!task) {
    return null;
  }

  const valuesToUpdate: {
    title?: string;
    description?: string;
    dueDate?: string | null;
    completed?: boolean;
  } = {};

  if (updateData.title !== undefined) {
    valuesToUpdate.title = updateData.title;
  }

  if (updateData.description !== undefined) {
    valuesToUpdate.description = updateData.description;
  }

  if (updateData.dueDate !== undefined) {
    valuesToUpdate.dueDate = updateData.dueDate || null;
  }

  if (updateData.completed !== undefined) {
    valuesToUpdate.completed = updateData.completed;
  }

  await task.update(valuesToUpdate);
  await task.reload();

  return task;
};

export const deleteTask = async (
  id: number,
  userId: number
): Promise<boolean> => {
  const deletedCount = await Task.destroy({
    where: {
      id,
      userId
    }
  });

  return deletedCount > 0;
};
