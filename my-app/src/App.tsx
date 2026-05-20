import { type Task } from './Type';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TaskDetailPage from './pages/TaskDetailPage';
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import { fetchAllTasks } from "./api/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState <string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllTasks();
      setTasks(data);
    }
    catch (err: any){
      setError(Error.message || 'Something went wrong while fetching task.');
    }
    finally {
      setLoading(false);
    }
  };

  loadTasks();
}, []);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}> Home Page </Link>
          <Link to="/create" style={{ textDecoration: 'none', color: '#28a745' }}> Create New Idea</Link>
        </nav>
        {loading && <div style={{ color: '#666', padding: '10px 0' }}>Loading tasks...</div>}
        {error && <div style={{ color: 'red', padding: '10px 0', fontWeight: 'bold' }}>Error: {error}</div>}
        <Routes>
          <Route path="/" element={<HomePage tasks={tasks} setTasks={setTasks} />} />
          <Route path="/task/:id" element={<TaskDetailPage tasks={tasks} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;