import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { ICONS } from '../types';

export default function AdminParcels() {
  const { parcels, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-divider h-16 flex items-center px-4 shadow-sm max-w-5xl mx-auto md:max-w-none">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background transition-all"
        >
          <ICONS.ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-primary font-display font-bold text-lg tracking-tight ml-2">All Parcels</h1>
      </header>

      <main className="pt-24 px-4 pb-24 space-y-4 max-w-md mx-auto">
        <div className="flex flex-col gap-4">
          {parcels.map((parcel, idx) => (
            <motion.div
              key={parcel.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/parcel/${parcel.id}`)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-divider flex justify-between items-center cursor-pointer hover:bg-background transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-divider">
                  <ICONS.Package className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display font-bold text-text-primary text-sm">{parcel.trackingId}</p>
                  <p className="text-xs text-text-secondary">{parcel.recipient}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                parcel.status === 'Collected' ? 'bg-status-collected-bg text-status-collected-text' : 
                parcel.status === 'Ready' ? 'bg-status-ready-bg text-status-ready-text' : 
                'bg-status-pending-bg text-status-pending-text'
              }`}>
                {parcel.status}
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
