import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../App';
import { ICONS } from '../types';
import { ParcelCard } from '../components/ParcelCard';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { logout, parcels } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'At Gate', 'Ready to Pick Up', 'Collected'];

  const filteredParcels = parcels.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Ready to Pick Up') return p.status === 'Ready';
    return p.status === filter;
  });

  const waitingCount = parcels.filter(p => p.status === 'Ready').length;

  return (
    <div className="pb-24 pt-16">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-white border-b border-divider shadow-sm">
        <h1 className="font-display font-bold text-xl text-primary">Campus Parcels</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/student/alerts')} className="text-primary hover:bg-background p-2 rounded-full transition-all active:scale-95">
            <ICONS.Bell size={24} />
          </button>
          <button onClick={logout} className="text-text-secondary hover:bg-background p-2 rounded-full transition-all active:scale-95">
            <ICONS.LogOut size={24} />
          </button>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6 max-w-md mx-auto">
        {/* Welcome Section */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-status-transit-bg rounded-2xl p-6 flex flex-col gap-1"
        >
          <h2 className="font-display text-2xl font-bold text-primary">Hi, Krushna 👋</h2>
          <p className="text-text-secondary text-sm">You have {waitingCount} parcels waiting for pickup</p>
        </motion.section>

        {/* Filters */}
        <section className="flex gap-2 overflow-x-auto no-scrollbar pb-2 pt-2 -mx-4 px-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 h-10 px-4 rounded-full font-display text-sm font-semibold transition-all border ${
                filter === f 
                ? 'bg-primary-container text-white border-primary-container shadow-md' 
                : 'bg-surface text-text-secondary border-divider hover:bg-background'
              }`}
            >
              {f}
            </button>
          ))}
        </section>

        {/* List */}
        <section className="space-y-4">
          <h3 className="font-display text-lg font-bold text-primary">Your Parcels</h3>
          <div className="flex flex-col gap-4">
            {filteredParcels.map((parcel, index) => (
              <motion.div
                key={parcel.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ParcelCard parcel={parcel} />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-white border-t border-divider p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] rounded-t-2xl">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center text-primary bg-primary-container/10 rounded-2xl px-5 py-2 transition-all">
          <ICONS.Package size={22} className="mb-1" fill="currentColor" />
          <span className="font-display text-[11px] font-bold">Parcels</span>
        </button>
        <button onClick={() => navigate('/student/alerts')} className="flex flex-col items-center justify-center text-text-secondary px-5 py-2 transition-all hover:bg-background rounded-2xl">
          <ICONS.Bell size={22} className="mb-1" />
          <span className="font-display text-[11px] font-bold">Alerts</span>
        </button>
        <button onClick={() => navigate('/student/profile')} className="flex flex-col items-center justify-center text-text-secondary px-5 py-2 transition-all hover:bg-background rounded-2xl">
          <ICONS.User size={22} className="mb-1" />
          <span className="font-display text-[11px] font-bold">Profile</span>
        </button>
      </nav>
    </div>
  );
}
