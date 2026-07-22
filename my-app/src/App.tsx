import { type Task } from './Type';
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import TaskDetailPage from './pages/TaskDetailPage';
import HomePage from './pages/HomePage';
import { useState, useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import { fetchAllTasks } from "./api/tasks";
import { LoginPage } from './pages/LoginPage';
import CreateNewIdea from './components/CreateNewIdea';

const getInitialToken = (): string | null => {
  const token = localStorage.getItem('token');

  if (!token || token === 'undefined' || token === 'null') {
    localStorage.removeItem('token');
    return null;
  }

  return token;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [authToken, setAuthToken] = useState<string | null>(getInitialToken);
  const isAuthenticated = !!authToken;

  useEffect(() => {
    if (!authToken) {
      return;
    }

    const loadTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchAllTasks();
        setTasks(data);
      } catch (err: unknown) {
        console.error("App.tsx fetch error:", err);
      
        const message = err instanceof Error
          ? err.message
          : 'Something went wrong while fetching tasks.';
      
        if (message.includes('Status: 401')) {
          localStorage.removeItem('token');
          setAuthToken(null);
          setTasks([]);
          window.location.href = '/login';
          return;
        }
      
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [authToken]);

  const handleLoginSuccess = () => {
    setError(null);

    const freshToken = getInitialToken();
    setAuthToken(freshToken);

    window.location.href = '/';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setTasks([]);
    setError(null);

    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
        {isAuthenticated && (
          <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff' }}> Home Page </Link>
              <Link to="/create" style={{ textDecoration: 'none', color: '#28a745' }}> Create New Idea</Link>
            </div>

            <button onClick={handleLogout} style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </nav>
        )}

        {loading && <div style={{ color: '#666', padding: '10px 0' }}>Loading tasks...</div>}
        {error && <div style={{ color: 'red', padding: '10px 0', fontWeight: 'bold' }}>Error: {error}</div>}

        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            element={isAuthenticated ? <HomePage tasks={tasks} setTasks={setTasks} /> : <Navigate to="/login" />}
          />

          <Route
            path="/create"
            element={isAuthenticated ? <CreateNewIdea /> : <Navigate to="/login" />}
          />

          <Route
            path="/task/:id"
            element={isAuthenticated ? <TaskDetailPage /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;