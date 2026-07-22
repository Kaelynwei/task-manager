import { type Task } from '../Type';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const getCleanToken = (): string => {
  let token = localStorage.getItem('token') || '';

  if (!token || token === 'undefined' || token === 'null') {
    return '';
  }

  return token
    .replace(/[\r\n]+/g, '')
    .trim()
    .replace(/[,;"'\]}]+$/, '')
    .replace(/^["'{\[]+/, '')
    .trim();
};

export const fetchAllTasks = async (): Promise<Task[]> => {
  const token = getCleanToken();
  const response = await fetch(`${API_URL}/api/v1/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    }
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks from server (Status: ${response.status})`);
  }
  const data = await response.json();

  return data.map((task: any) => ({
    id: task.id,
    name: task.title || task.name || "Untitled Task",
    completed: task.completed ?? false,
    description: task.description || "",
    dueDate: task.dueDate || task.due_date || "" 
  }));
};

export const createTask = async (taskData: { 
  title: string; 
  description: string; 
  dueDate: string; 
}): Promise<Task> => {
  const token = getCleanToken();
  const response = await fetch(`${API_URL}/api/v1/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create task (Status: ${response.status})`);
  }

  const task = await response.json();
  
  return {
    id: task.id, 
    name: task.title || taskData.title, 
    completed: task.completed ?? false,
    description: task.description || taskData.description,
    dueDate: task.dueDate || task.due_date || taskData.dueDate
  };
};

export const updateTask = async (
  id: number,
  data: { 
    title?: string; 
    description?: string; 
    dueDate?: string; 
    completed?: boolean; 
  }
): Promise<Task> => {
  const token = getCleanToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(`Failed to update task. Status: ${response.status}`);
  }

  const task = JSON.parse(responseText);

  return {
    id: Number(id),
    name: task.title || task.name || 'Task',
    completed: task.completed ?? false,
    description: task.description || '',
    dueDate: task.dueDate || task.due_date || '',
  };
};

export const deleteTask = async (id: number): Promise<void> => {
  const token = getCleanToken();
  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to delete task (Status: ${response.status})`);
  }
};

export const fetchTaskById = async (id: number): Promise<Task> => {
  const token = getCleanToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}/api/v1/tasks/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(
      `Failed to fetch task. Status: ${response.status}. Response: ${responseText}`
    );
  }

  if (!responseText) {
    throw new Error('Server returned an empty task response');
  }

  const task = JSON.parse(responseText);

  return {
    id: task.id,
    name: task.title || task.name || 'Untitled Task',
    completed: task.completed ?? false,
    description: task.description || 'No description provided.',
    dueDate: task.dueDate || task.due_date || 'No due date set.',
  };
};

