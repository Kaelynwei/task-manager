// Controllers validate task requests and convert service results into HTTP responses.

import { Request, Response } from 'express';
import * as taskService from '../services/taskService';

interface AuthenticatedRequest extends Request {
  userId?: number;
}

// Return all tasks owned by the authenticated user
export const getTasks = async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userId = Number(authReq.userId);

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized: User ID is missing'
      });
    }

    const tasks = await taskService.getAllTasks(userId);

    return res.status(200).json(tasks);
  } catch (error: any) {
    console.error('getTasks error:', error);

    return res.status(500).json({
      message: error.message
    });
  }
};

// Return one task by id, only if it belongs to the authenticated user
export const getTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const authReq = req as AuthenticatedRequest;
    const userId = Number(authReq.userId);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        message: 'Invalid task ID'
      });
    }

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized: User ID is missing'
      });
    }

    const task = await taskService.getTaskById(id, userId);

    if (!task) {
      return res.status(404).json({
        message: 'Task not found'
      });
    }

    return res.status(200).json(task);
  } catch (error: any) {
    console.error('getTask error:', error);

    return res.status(500).json({
      message: error.message
    });
  }
};

// Create a new task for the authenticated user after validating the title
export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        message: 'title is required and cannot be empty'
      });
    }

    const authReq = req as AuthenticatedRequest;
    const userId = Number(authReq.userId);

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized: User ID is missing'
      });
    }

    const newTask = await taskService.createTask(
      title,
      userId,
      description,
      dueDate
    );

    return res.status(201).json(newTask);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// Delete a task only when it belongs to the authenticated user
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const authReq = req as AuthenticatedRequest;
    const userId = Number(authReq.userId);

    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized: User ID is missing'
      });
    }

    const success = await taskService.deleteTask(id, userId);

    if (!success) {
      return res.status(404).json({
        message: 'Task not found to delete'
      });
    }

    return res.status(200).json({
      message: 'Task deleted successfully'
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message
    });
  }
};

// Update editable task fields and return the latest saved task
export const updateTask = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { title, description, dueDate, completed } = req.body;
  
      const authReq = req as AuthenticatedRequest;
      const userId = Number(authReq.userId);
  
      if (!Number.isInteger(id)) {
        return res.status(400).json({
          message: 'Invalid task ID',
        });
      }
  
      if (!userId) {
        return res.status(401).json({
          message: 'Unauthorized: User ID is missing',
        });
      }
  
      if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({
          message: 'completed must be a boolean',
        });
      }
  
      const updatedTask = await taskService.updateTask(id, userId, {
        title,
        description,
        dueDate,
        completed
      });
  
      if (!updatedTask) {
        return res.status(404).json({
          message: 'Task not found to update',
        });
      }
  
      return res.status(200).json(updatedTask);
    } catch (error: any) {
      console.error('updateTask error:', error);
  
      return res.status(500).json({
        message: error.message,
      });
    }
  };