import { Sequelize } from 'sequelize-typescript';
import { Task } from '../models/Task';
import dotenv from 'dotenv';
import { User } from '../models/User';


dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'task_manager',
    models: [Task, User],
    logging: false,
  });