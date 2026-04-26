import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
import { Task } from '../models/Task';

dontenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    models: [Task],
    logging: false,
});

export default sequelize;