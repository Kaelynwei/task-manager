import 'reflect-metadata';
import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks';
import authRoutes from './routes/auth';
import { Umzug, SequelizeStorage } from 'umzug';
import { sequelize } from './config/database';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000; 

app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:8080',
    'http://127.0.0.1:8080'
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'authorization', 
    'Accept', 
    'X-Requested-With'
  ],
  credentials: true
}));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});


app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    const umzug = new Umzug({
      migrations: {
        glob: process.env.NODE_ENV === 'production'
          ? 'dist/migrations/*.js'
          : 'src/migrations/*.ts'
      },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });

    await umzug.up();
    console.log('Migrations complete');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();