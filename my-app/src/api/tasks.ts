import { type Task } from '../Type';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


export const fetchAllTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/api/v1/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks from server');
  }
  const data = await response.json();
  
  return data.map((task: any) => ({
    id: task.id,
    name: task.title || task.name,
    completed: task.completed,
    description: task.description || "",
    dueDate: task.dueDate || ""
  }));
};

export const createTask = async (title: string): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/v1/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  const task = await response.json();
  return {
    id: task.id || Date.now(),
    name: task.title || title, 
    completed: task.completed ?? false,
    description: task.description || "",
    dueDate: task.dueDate || ""
  };
};

export const updateTask = async (id: number, data: { completed: boolean }): Promise<Task> => {
  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: data.completed }),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  const task = await response.json();
  return {
    id: task.id || id,
    name: task.title || task.name || "Task",
    completed: data.completed,
    description: task.description || "",
    dueDate: task.dueDate || ""
  };
};

export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};