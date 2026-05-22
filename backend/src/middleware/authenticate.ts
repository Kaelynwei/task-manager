import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  // Extract token from Authorization: Bearer <token> header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token with jwt.verify() using JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    // Attach req.user = { userId } for downstream use
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    // Return 401 if token missing or invalid
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    return;
  }
};