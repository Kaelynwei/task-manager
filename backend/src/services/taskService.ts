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

export const updateTask = async (id: number, completed: boolean): Promise<Task | null> => {
    const task = await Task.findByPk(id);
    if (task) {
        task.completed = completed;
        await task.save();
    }
    return task;
};

export const deleteTask = async (id: number): Promise<boolean> => {
    const deletedCount = await Task.destroy({ where: { id }});
    return deletedCount > 0;
};

