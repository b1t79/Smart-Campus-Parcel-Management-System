import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../App';
import { ICONS } from '../types';

export default function ParcelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { parcels } = useAuth();
  const parcel = parcels.find(p => p.id === id);

  if (!parcel) return <div className="p-8 text-center">Parcel not found</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Top App Bar */}
      <header className="bg-white border-b border-divider flex items-center justify-between w-full h-16 px-4 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary hover:bg-background p-2 rounded-full transition-all active:scale-90"
        >
          <ICONS.ArrowLeft size={24} />
        </button>
        <h1 className="text-primary font-display font-bold text-lg tracking-tight">Parcel Details</h1>
        <div className="w-10" />
      </header>

      <main className="p-4 space-y-4 max-w-md mx-auto pb-12">
        {/* Info Card */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface rounded-2xl p-4 shadow-sm border border-divider"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-divider">
                <ICONS.Package className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs text-text-secondary font-medium">{parcel.courier}</p>
                <p className="font-display font-bold text-text-primary text-base">{parcel.trackingId}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
              parcel.status === 'Ready' ? 'bg-status-ready-bg text-status-ready-text border-status-ready-text/20' :
              parcel.status === 'Collected' ? 'bg-status-collected-bg text-status-collected-text border-status-collected-text/20' :
              'bg-status-pending-bg text-status-pending-text border-status-pending-text/20'
            }`}>
              {parcel.status === 'Ready' ? 'READY TO PICK UP' : parcel.status.toUpperCase()}
            </div>
          </div>
        </motion.section>

        {/* Timeline */}
        <section className="bg-surface rounded-2xl p-6 shadow-sm border border-divider">
          <h2 className="font-display font-bold text-text-primary mb-8 border-b border-divider pb-4">Tracking History</h2>
          <div className="relative space-y-8 pl-4">
            {/* Main line */}
            <div className="absolute left-[19px] top-6 bottom-10 w-[2px] bg-divider" />
            {/* Progress fill */}
            <div className="absolute left-[19px] top-6 h-[55%] w-[2px] bg-primary" />

            {parcel.history.map((item, idx) => (
              <div key={idx} className="relative z-10 flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-4 border-surface shadow-md ${
                  item.completed 
                  ? 'bg-primary ring-2 ring-primary/20' 
                  : (idx === 2 ? 'bg-secondary ring-2 ring-secondary/20' : 'bg-background grayscale opacity-50')
                }`}>
                  {item.completed ? (
                    <ICONS.CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    idx === 2 ? (
                      <ICONS.Clock className="w-4 h-4 text-white" />
                    ) : (
                      <ICONS.Package className="w-4 h-4 text-text-secondary" />
                    )
                  )}
                </div>
                <div>
                  <h3 className={`text-sm font-bold ${item.completed ? 'text-text-primary' : (idx === 2 ? 'text-secondary' : 'text-text-secondary')}`}>
                    {item.event}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QR Code */}
        {parcel.status !== 'Collected' && (
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-surface rounded-2xl p-8 shadow-sm border border-divider text-center"
          >
            <h2 className="font-display font-bold text-text-primary mb-8">Your Collection QR Code</h2>
            <div className="w-48 h-48 mx-auto bg-white border-2 border-divider rounded-2xl p-4 shadow-inner mb-6 flex items-center justify-center relative overflow-hidden group">
              <ICONS.ScanLine className="absolute inset-0 text-primary/5 w-full h-full p-2" />
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${parcel.trackingId}`}
                alt="QR Code" 
                className="w-40 h-40 object-contain relative z-10"
              />
            </div>
            <p className="text-xs text-text-secondary max-w-[200px] mx-auto leading-relaxed">
              Show this QR to the hostel staff to collect your parcel
            </p>
          </motion.section>
        )}
      </main>
    </div>
  );
}
