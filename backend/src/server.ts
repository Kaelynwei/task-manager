import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks';
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000; 

app.use(express.json());
app.use(cors());
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes); // /api/v1/auth

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(errorHandler);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        const umzug = new Umzug({
            migrations: { glob: 'src/migrations/*.ts' }, 
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({ sequelize }),
            logger: console,
        });
        await umzug.up();
        console.log('Migrations complete');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1); 
    }
};

startServer();