import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

// POST /register → authController.register
router.post('/register', authController.register);

// POST /login → authController.login
router.post('/login', authController.login);

export default router;