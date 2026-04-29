import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Parcel, ICONS } from '../types';

interface ParcelCardProps {
  parcel: Parcel;
}

export function ParcelCard({ parcel }: ParcelCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'At Gate': return 'bg-status-pending-bg text-status-pending-text';
      case 'Ready': return 'bg-status-ready-bg text-status-ready-text';
      case 'Collected': return 'bg-status-collected-bg text-status-collected-text';
      default: return 'bg-status-transit-bg text-status-transit-text';
    }
  };

  const getStatusLabel = (status: string) => {
    if (status === 'Ready') return 'READY TO PICK UP';
    return status.toUpperCase();
  };

  return (
    <motion.article 
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/parcel/${parcel.id}`)}
      className="bg-surface rounded-2xl p-4 shadow-sm border border-divider flex flex-col gap-4 cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-divider">
            <ICONS.Package className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium">{parcel.courier}</p>
            <p className="font-display font-semibold text-text-primary">{parcel.trackingId}</p>
          </div>
        </div>
        <span className={`${getStatusColor(parcel.status)} text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider`}>
          {getStatusLabel(parcel.status)}
        </span>
      </div>

      <div className="bg-background p-3 rounded-xl border border-divider flex items-center gap-2">
        <ICONS.MapPin size={14} className="text-text-secondary" />
        <p className="text-xs text-text-secondary">
          From: {parcel.location} <span className="mx-1 text-divider">|</span> To: {parcel.destination}
        </p>
      </div>

      <div className="flex items-center justify-between relative mt-2 px-2">
        <div className="absolute left-6 right-6 top-[11px] h-[2px] bg-divider -z-10" />
        
        {/* Step 1: Arrived */}
        <div className="flex flex-col items-center gap-1.5 bg-surface z-10 px-1">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <ICONS.CheckCircle2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-[10px] text-text-secondary font-medium">Arrived</span>
        </div>

        {/* Step 2: At Office */}
        <div className="flex flex-col items-center gap-1.5 bg-surface z-10 px-1">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${parcel.status !== 'At Gate' ? 'bg-primary' : 'bg-surface border-2 border-divider'}`}>
            {parcel.status !== 'At Gate' ? (
              <ICONS.CheckCircle2 className="w-3.5 h-3.5 text-white" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-divider" />
            )}
          </div>
          <span className="text-[10px] text-text-secondary font-medium">At Office</span>
        </div>

        {/* Step 3: Ready */}
        <div className="flex flex-col items-center gap-1.5 bg-surface z-10 px-1">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm ${parcel.status === 'Ready' ? 'bg-secondary border-2 border-secondary' : 'bg-surface border-2 border-divider'}`}>
            {parcel.status === 'Ready' ? (
              <ICONS.CheckCircle2 className="w-3.5 h-3.5 text-white" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-divider" />
            )}
          </div>
          <span className={`text-[10px] font-medium ${parcel.status === 'Ready' ? 'text-secondary' : 'text-text-secondary'}`}>Ready</span>
        </div>
      </div>
    </motion.article>
  );
}
