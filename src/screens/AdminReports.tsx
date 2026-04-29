import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { ICONS } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminReports() {
  const navigate = useNavigate();
  const { parcels } = useAuth();

  const statusData = [
    { name: 'Pending', value: parcels.filter(p => ['At Gate', 'At Office'].includes(p.status)).length },
    { name: 'Ready', value: parcels.filter(p => p.status === 'Ready').length },
    { name: 'Collected', value: parcels.filter(p => p.status === 'Collected').length },
  ];

  const COLORS = ['#F97316', '#16A34A', '#6B7280'];

  const courierData = [
    { name: 'Amazon', count: parcels.filter(p => p.courier === 'Amazon').length },
    { name: 'BlueDart', count: parcels.filter(p => p.courier === 'BlueDart').length },
    { name: 'India Post', count: parcels.filter(p => p.courier === 'India Post').length },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-divider h-16 flex items-center px-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-background rounded-full transition-all">
          <ICONS.ArrowLeft size={24} className="text-primary" />
        </button>
        <h1 className="flex-1 text-primary font-display font-bold text-lg ml-2">Reports & Analytics</h1>
      </header>

      <main className="pt-24 px-4 pb-24 space-y-6 max-w-lg mx-auto">
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-divider"
        >
          <h2 className="font-display font-bold text-primary mb-6">Delivery Status Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map((s, i) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                <span className="text-xs text-text-secondary font-medium">{s.name}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-divider"
        >
          <h2 className="font-display font-bold text-primary mb-6">Parcels by Courier</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courierData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#002451" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
