import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      login(res.data);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border px-3 py-2 rounded" type="email" placeholder="Email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="w-full border px-3 py-2 rounded" type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">No account? <Link to="/register" className="text-indigo-600">Register</Link></p>
      </div>
    </div>
  );
}