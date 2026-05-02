import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex gap-6 font-semibold">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">{user?.name} ({user?.role})</span>
        <button onClick={handleLogout} className="bg-white text-indigo-600 px-3 py-1 rounded text-sm font-semibold">
          Logout
        </button>
      </div>
    </nav>
  );
}