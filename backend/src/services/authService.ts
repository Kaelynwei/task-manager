import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as userStore from '../data/userStore';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export const register = async (email: string, username: string, passwordPlain: string) => {
    // check email is validated 
    const existingEmail = await userStore.getUserByEmail(email);
    if (existingEmail) {
      const error = new Error('Email already exists');
      (error as any).statusCode = 409;
      throw error;
    }
  
    // check username is validated
    const existingUsername = await userStore.getUserByUsername(username);
    if (existingUsername) {
      const error = new Error('Username already exists');
      (error as any).statusCode = 409;
      throw error;
    }
  
    // bcrypt hash password 
    const passwordHash = await bcrypt.hash(passwordPlain, 10);
  
    // save to DB 
    const newUser = await userStore.createUser({
      email,
      username,
      passwordHash,
    });
  
    // return JWT token
    const token = generateToken(newUser.id);
  
    // return token and userId and not include password
    return { token, userId: newUser.id };
  };
  
  
  export const login = async (email: string, passwordPlain: string) => {
    // find user by email
    const user = await userStore.getUserByEmail(email);
    
    if (!user) {
      const error = new Error('Invalid email or password');
      (error as any).statusCode = 401; 
      throw error;
    }

    const userData = user.get({ plain: true });
  
    const isPasswordValid = await bcrypt.compare(passwordPlain, userData.passwordHash);
    
    if (!isPasswordValid) {
      const error = new Error('Invalid email or password');
      (error as any).statusCode = 401;
      throw error;
    }
  
    // return JWT token
    const token = generateToken(user.id);
  
    return { token, userId: user.id };
  };