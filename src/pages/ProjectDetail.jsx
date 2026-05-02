import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  TODO: 'bg-yellow-100 text-yellow-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  DONE: 'bg-green-100 text-green-700',
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = () => api.get(`/tasks/project/${id}`).then(res => setTasks(res.data));

  useEffect(() => { fetchTasks(); }, [id]);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post('/tasks', { ...form, project: { id: Number(id) } });
    setForm({ title: '', description: '', dueDate: '' });
    setShowForm(false);
    fetchTasks();
  };

  const updateStatus = async (taskId, status) => {
    await api.put(`/tasks/${taskId}`, { status });
    fetchTasks();
  };

  const deleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
          <button onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700">
            + Add Task
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow mb-6 space-y-3">
            <input className="w-full border px-3 py-2 rounded" placeholder="Task title"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <textarea className="w-full border px-3 py-2 rounded" placeholder="Description"
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <input className="w-full border px-3 py-2 rounded" type="date"
              value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold">Add Task</button>
          </form>
        )}

        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
                {task.dueDate && <p className="text-xs text-gray-400 mt-1">Due: {task.dueDate}</p>}
              </div>
              <div className="flex gap-2 items-center">
                <select value={task.status}
                  onChange={e => updateStatus(task.id, e.target.value)}
                  className={`text-xs px-2 py-1 rounded font-semibold border-0 ${STATUS_COLORS[task.status]}`}>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
                {user?.role === 'ADMIN' && (
                  <button onClick={() => deleteTask(task.id)}
                    className="text-red-500 text-xs hover:underline">Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}