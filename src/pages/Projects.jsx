import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  const fetchProjects = () => api.get('/projects').then(res => setProjects(res.data));

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/projects', form);
    setForm({ name: '', description: '' });
    setShowForm(false);
    fetchProjects();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
          {user?.role === 'ADMIN' && (
            <button onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700">
              + New Project
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow mb-6 space-y-3">
            <input className="w-full border px-3 py-2 rounded" placeholder="Project name"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <textarea className="w-full border px-3 py-2 rounded" placeholder="Description"
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold">Create</button>
          </form>
        )}

        <div className="grid gap-4">
          {projects.map(p => (
            <Link to={`/projects/${p.id}`} key={p.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-md transition block">
              <h3 className="font-bold text-lg text-indigo-700">{p.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{p.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}