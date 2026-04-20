
import { Task } from '../types/index';

let tasks: Task[] = [
    {id: 1, name: "BACKEND", completed: false}
];

export const getAllTasks = (): Task[] => {
    return tasks;
}