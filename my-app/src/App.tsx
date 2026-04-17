import { type Task } from './Type';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TaskDetailPage from './pages/TaskDetailPage';
import HomePage from './pages/HomePage';
import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState<Task[]> ([
    {id: 1, name: "first task", completed: false, description: "first task description", dueDate: "2026-04-04"},
    {id: 2, name: "second task", completed: false, description: "second task description", dueDate: "2026-04-05"},
    {id: 3, name: "third task", completed: false, description: "third task description", dueDate: "2026-04-05"}
  ]);

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}> Home Page </Link>
          <Link to="/create" style={{ textDecoration: 'none', color: '#28a745' }}> Create New Idea</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage tasks={tasks} setTasks={setTasks} />} />
          <Route path="/task/:id" element={<TaskDetailPage tasks={tasks} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;