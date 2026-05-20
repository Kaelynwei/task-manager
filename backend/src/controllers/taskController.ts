import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const getTasks = async (req: Request, res: Response) =>{
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
}

export const getTask = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const task = await taskService.getTaskById(id);

    if (!task) {
        return res.status(404).json({ message: "Task not found"});
    }
    res.status(200).json(task);
}
    
export const addTask = async (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: "title is required and cannot be empty" });
    }
    const newTask = await taskService.createTask(title);
    res.status(201).json(newTask);
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const success = await taskService.deleteTask(id);

        if (!success) {
            return res.status(404).json({ message: "Task not found to delete" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { completed } = req.body;

        const updatedTask = await taskService.updateTask(id, completed);

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found to update" });
        }
        res.status(200).json(updatedTask);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
