import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../api/axios';

export default function Dashboard() {
  const [stats, setStats] = useState({ todo: 0, inProgress: 0, done: 0, overdue: 0 });

  useEffect(() => {
    api.get('/tasks/dashboard').then(res => setStats(res.data));
  }, []);

  const cards = [
    { label: 'To Do', value: stats.todo, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'In Progress', value: stats.inProgress, color: 'bg-blue-100 text-blue-700' },
    { label: 'Done', value: stats.done, color: 'bg-green-100 text-green-700' },
    { label: 'Overdue', value: stats.overdue, color: 'bg-red-100 text-red-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map(c => (
            <div key={c.label} className={`rounded-xl p-6 shadow text-center ${c.color}`}>
              <div className="text-4xl font-bold">{c.value}</div>
              <div className="mt-2 font-semibold">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}