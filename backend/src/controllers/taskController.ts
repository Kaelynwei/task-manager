import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

export const getTasks = (req: Request, res: Response) =>{
    const tasks = taskService.getAllTasks();
    res.json(tasks);
}