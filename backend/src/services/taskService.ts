import { Task } from '../models/Task';

export const getAllTasks = async (): Promise <Task[]> => {
    return await Task.findAll();
};

export const getTaskById = async (id: number): Promise <Task | null>=> {
    return await Task.findByPk(id);
};

export const createTask = async (title: string): Promise <Task> => {
    const newTask = await Task.create ({
        
        title,
        completed: false
    });
    return newTask;
};