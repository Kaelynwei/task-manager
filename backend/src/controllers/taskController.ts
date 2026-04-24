import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const getTasks = (req: Request, res: Response) =>{
    const tasks = taskService.getAllTasks();
    res.status(200).json(tasks);
}

export const getTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const task = taskService.getTaskById(id);

    if (!task) {
        return res.status(404).json({ message: "Task not found"});
    }
    res.status(200).json(task);
}
    
export const addTask = (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: "title is required and cannot be empty" });
    }
    const newTask = taskService.createTask(title);
    res.status(201).json(newTask);
};