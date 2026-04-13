import IdeaList from "./components/IdeaList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { type Task } from './Type';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/HomePage';

function App() {

  return (
    <BrowserRouter>
      <div className="container py-4">
        <nav className="mb-4">
          <Link to="/" className="btn btn-outline-primary me-2"> Home Page </Link>
          <Link to="/create" className="btn btn-outline-success"> Create New Idea</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;