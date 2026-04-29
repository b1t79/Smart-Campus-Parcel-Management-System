import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../App';
import { ICONS } from '../types';
import { useNavigate } from 'react-router-dom';
import Scanner from '../components/Scanner';

export default function AdminDashboard() {
  const { logout, parcels, markCollected } = useAuth();
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const pendingParcels = parcels.filter(p => p.status !== 'Collected');

  const stats = [
    { label: 'Total', value: parcels.length, color: 'bg-surface-container-high text-on-surface' },
    { label: 'Pending', value: pendingParcels.length, color: 'bg-status-pending-bg text-status-pending-text' },
    { label: 'Collected', value: parcels.filter(p => p.status === 'Collected').length, color: 'bg-status-ready-bg text-status-ready-text' },
  ];

  const handleScan = (data: string) => {
    const parcel = parcels.find(p => p.trackingId === data || p.id === data);
    if (parcel) {
      markCollected(parcel.id);
      alert(`Parcel ${parcel.trackingId} marked as collected for ${parcel.recipient}`);
    } else {
      alert(`Parcel not found: ${data}`);
    }
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Top AppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-divider h-16 flex justify-between items-center px-4 shadow-sm md:hidden">
        <button className="text-text-secondary hover:bg-background p-2 rounded-full transition-all">
          <ICONS.Bell size={24} />
        </button>
        <h1 className="font-display font-bold text-lg text-primary tracking-tight">Admin Dashboard</h1>
        <button onClick={logout} className="text-text-secondary hover:bg-background p-2 rounded-full transition-all">
          <ICONS.LogOut size={24} />
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-divider z-40">
        <div className="h-16 flex items-center px-6 border-b border-divider">
          <h1 className="font-display font-bold text-xl text-primary font-bold">Campus Parcels</h1>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <button onClick={() => navigate('/')} className="flex items-center space-x-3 px-4 py-3 bg-primary-container text-white w-full rounded-xl transition-all shadow-md text-left">
            <ICONS.LayoutDashboard size={20} />
            <span className="font-display text-sm font-bold">Dashboard</span>
          </button>
          <button onClick={() => navigate('/admin/parcels')} className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:bg-background w-full rounded-xl transition-all text-left">
            <ICONS.Package size={20} />
            <span className="font-display text-sm font-bold">Parcels</span>
          </button>
          <button onClick={() => navigate('/admin/reports')} className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:bg-background w-full rounded-xl transition-all text-left">
            <ICONS.FileText size={20} />
            <span className="font-display text-sm font-bold">Reports</span>
          </button>
        </nav>
        <div className="p-4 border-t border-divider">
          <button onClick={logout} className="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <ICONS.LogOut size={20} />
            <span className="font-display text-sm font-bold">Logout</span>
          </button>
        </div>
      </aside>

      <main className="pt-20 px-4 md:ml-64 md:pt-8 md:px-8 max-w-5xl mx-auto pb-24">
        {/* Stats Row */}
        <section className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`${stat.color} rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm h-28 border border-divider`}
            >
              <span className="text-2xl font-bold mb-1">{stat.value}</span>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{stat.label}</span>
            </motion.div>
          ))}
        </section>

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-xl font-bold text-primary">Pending Parcels</h2>
          <button className="p-3 text-text-secondary bg-white rounded-full shadow-md hover:bg-background border border-divider transition-all active:scale-95">
            <ICONS.Filter size={18} />
          </button>
        </div>

        {/* Parcel List */}
        <div className="space-y-4">
          {pendingParcels.map((parcel, idx) => (
            <motion.article 
              key={parcel.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (idx * 0.1) }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-divider flex flex-col gap-4 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display font-bold text-text-primary text-base">{parcel.recipient}</h3>
                  <p className="text-xs text-text-secondary font-medium tracking-tight">Enrollment: {parcel.trackingId.replace('PKT', 'ADT24SOCB')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                  parcel.status === 'Ready' ? 'bg-status-ready-bg text-status-ready-text' : 'bg-status-pending-bg text-status-pending-text'
                }`}>
                  {parcel.status === 'Ready' ? 'Ready to Pick Up' : 'At Gate'}
                </span>
              </div>

              <div className="flex items-center gap-3 text-text-secondary bg-background p-3 rounded-xl border border-divider">
                <ICONS.Truck size={18} />
                <span className="text-sm font-bold">{parcel.courier}</span>
                <span className="text-xs ml-auto font-mono opacity-60 tracking-wider">ID: {parcel.trackingId}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-text-secondary opacity-80">
                  <ICONS.MapPin size={14} className="text-primary" />
                  <span className="text-xs font-medium">{parcel.destination}</span>
                </div>
                <button 
                  onClick={() => markCollected(parcel.id)}
                  className="text-primary font-display text-sm font-bold hover:text-primary-light transition-all px-2 py-1 rounded-lg"
                >
                  Mark Collected
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {showScanner && (
          <Scanner onScan={handleScan} onClose={() => setShowScanner(false)} />
        )}
      </AnimatePresence>

      {/* FABs */}
      <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 flex flex-col gap-3 items-end z-50">
        <button 
          onClick={() => setShowScanner(true)}
          className="bg-secondary text-white h-14 px-6 rounded-2xl shadow-xl flex items-center gap-3 hover:bg-opacity-90 transition-all active:scale-95 group"
        >
          <ICONS.QrCode size={24} />
          <span className="font-display text-sm font-bold">Scan QR</span>
        </button>
        <button 
          onClick={() => navigate('/admin/add')}
          className="bg-primary text-white h-14 px-6 rounded-2xl shadow-xl flex items-center gap-3 hover:bg-primary-light transition-all active:scale-95 group"
        >
          <ICONS.Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-display text-sm font-bold">Add Parcel</span>
        </button>
      </div>

      {/* Bottom Nav Mobile */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-white border-t border-divider shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden rounded-t-3xl px-2">
        <button onClick={() => navigate('/')} className="flex flex-col items-center justify-center bg-primary-container text-white rounded-2xl px-6 py-2 transition-all">
          <ICONS.LayoutDashboard size={20} fill="currentColor" />
          <span className="text-[10px] mt-1 font-bold">Dashboard</span>
        </button>
        <button onClick={() => navigate('/admin/parcels')} className="flex flex-col items-center justify-center text-text-secondary px-6 py-2 hover:bg-background rounded-2xl">
          <ICONS.Package size={20} />
          <span className="text-[10px] mt-1 font-bold">Parcels</span>
        </button>
        <button onClick={() => navigate('/admin/reports')} className="flex flex-col items-center justify-center text-text-secondary px-6 py-2 hover:bg-background rounded-2xl">
          <ICONS.FileText size={20} />
          <span className="text-[10px] mt-1 font-bold">Reports</span>
        </button>
      </nav>
    </div>
  );
}
