import 'dotenv/config'; 
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'KAELYN_SUPER_SECRET_KEY_2026';

interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader?.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized: Missing or invalid Authorization header',
      });
      return;
    }
  
    const token = authHeader.slice(7).trim();
  
    if (!token) {
      res.status(401).json({
        error: 'Unauthorized: Token is empty',
      });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userId: number;
      };
  
      if (!decoded.userId) {
        res.status(401).json({
          error: 'Unauthorized: JWT does not contain userId',
        });
        return;
      }
  
      req.userId = decoded.userId;
      next();
    } catch (error: any) {
      console.error('JWT verification failed:', error.message);
  
      res.status(401).json({
        error: `Unauthorized: ${error.message}`,
      });
    }
  };
