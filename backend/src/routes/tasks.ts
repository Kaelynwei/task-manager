import { Router } from 'express';
import * as taskController from '../controllers/taskController';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.get('/', authenticate, taskController.getTasks);
router.get('/:id', authenticate, taskController.getTask);
router.post('/', authenticate, taskController.addTask);
router.delete('/:id', authenticate, taskController.deleteTask);
router.put('/:id', authenticate, taskController.updateTask);

export default router;