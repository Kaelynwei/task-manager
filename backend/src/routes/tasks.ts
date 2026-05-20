import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router =  Router();

router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTask)
router.post('/', taskController.addTask)
router.delete('/:id', taskController.deleteTask)
router.put('/:id', taskController.updateTask)

export default router;
