import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'MEMBER' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
  console.log("ERROR:", err);

  const message =
    err.response?.data?.message ||
    err.response?.data ||
    err.message ||
    "Registration failed";

  setError(message);
}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Register</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border px-3 py-2 rounded" placeholder="Full Name"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full border px-3 py-2 rounded" type="email" placeholder="Email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input className="w-full border px-3 py-2 rounded" type="password" placeholder="Password"
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <select className="w-full border px-3 py-2 rounded"
            value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
            <option value="MEMBER">Member</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700">
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">Have account? <Link to="/login" className="text-indigo-600">Login</Link></p>
      </div>
    </div>
  );
}