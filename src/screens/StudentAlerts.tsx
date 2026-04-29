import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../types';

export default function StudentAlerts() {
  const navigate = useNavigate();
  
  const alerts = [
    { 
      id: 1, 
      title: 'Parcel Ready', 
      msg: 'Your Amazon parcel (PKT-2024-087) is ready for pickup at Hostel A Office.', 
      time: '2 hours ago',
      type: 'success'
    },
    { 
      id: 2, 
      title: 'New Delivery', 
      msg: 'A BlueDart parcel (PKT-2024-091) has arrived at the Main Gate.', 
      time: '5 hours ago',
      type: 'info'
    },
    { 
      id: 3, 
      title: 'Reminder', 
      msg: 'Please collect your India Post parcel before 8 PM tonight.', 
      time: 'Yesterday',
      type: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-divider h-16 flex items-center px-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-background rounded-full transition-all">
          <ICONS.ArrowLeft size={24} className="text-primary" />
        </button>
        <h1 className="flex-1 text-primary font-display font-bold text-lg ml-2">Notifications</h1>
      </header>

      <main className="pt-24 px-4 pb-24 space-y-4 max-w-md mx-auto">
        {alerts.map((alert, idx) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-divider flex gap-4"
          >
            <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${
              alert.type === 'success' ? 'bg-status-ready-bg text-status-ready-text' :
              alert.type === 'warning' ? 'bg-status-pending-bg text-status-pending-text' :
              'bg-status-transit-bg text-status-transit-text'
            }`}>
              <ICONS.Bell size={20} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-display font-bold text-text-primary text-sm">{alert.title}</h3>
                <span className="text-[10px] text-text-secondary font-medium">{alert.time}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{alert.msg}</p>
            </div>
          </motion.div>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <ICONS.Bell size={48} className="mx-auto mb-4" />
            <p>No new notifications</p>
          </div>
        )}
      </main>
    </div>
  );
}
