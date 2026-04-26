import { Task } from '../types/index';

let tasks: Task[] = [
    {id: 1, title: "BACKEND", completed: false}
];

export const getAllTasks = (): Task[] => {
    return tasks;
};

export const getTaskById = (id: number): Task | undefined => {
    return tasks.find(t => t.id === id);
};

export const createTask = (title: string): Task => {
    const newTask: Task ={
        id: Date.now(),
        title,
        completed: false
    };
    tasks.push(newTask);
    return newTask;
};