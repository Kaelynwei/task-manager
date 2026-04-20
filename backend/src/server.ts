import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/tasks';


dotenv.config();

const app = express();
const PORT = 4000; 



app.use(express.json());
app.use(cors());
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});