import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { ICONS } from '../types';

export default function AddParcel() {
  const navigate = useNavigate();
  const { addParcel } = useAuth();

  const handleLogParcel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const courier = (e.currentTarget.elements.namedItem('courier_name') as HTMLSelectElement).value;
    const trackingId = (e.currentTarget.elements.namedItem('awb') as HTMLInputElement).value;
    
    if (!courier || !trackingId) {
      alert('Please fill in courier and tracking ID');
      return;
    }

    addParcel({
      id: Math.random().toString(36).substr(2, 9),
      courier,
      trackingId,
      recipient: 'Krushna Kumbhar',
      location: 'Main Gate',
      destination: 'Hostel A, Room 204',
      status: 'At Gate',
      updatedAt: new Date().toLocaleTimeString(),
      createdAt: new Date().toLocaleTimeString(),
      history: [
        { event: 'Arrived at Main Gate', time: new Date().toLocaleString(), completed: true },
        { event: 'Stored at Hostel Office', time: 'Pending', completed: false },
        { event: 'Ready for Collection', time: 'Pending', completed: false },
        { event: 'Collected', time: 'Pending', completed: false },
      ]
    });

    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-divider h-16 flex items-center px-4 shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-background transition-all active:scale-90 text-primary mr-2"
        >
          <ICONS.ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-primary font-display font-bold text-lg tracking-tight">Log New Parcel</h1>
      </header>

      <main className="pt-24 px-4 py-8 max-w-md mx-auto w-full pb-24 space-y-6">
        <form className="space-y-6" onSubmit={handleLogParcel}>
          {/* Student Identity Block */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface rounded-2xl p-6 shadow-sm border border-divider space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <ICONS.User className="text-primary" size={20} fill="currentColor" strokeWidth={1} />
              <h2 className="font-display font-bold text-primary">Student Identity</h2>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest absolute left-4 top-2 pointer-events-none z-10 transition-colors group-focus-within:text-primary">
                  Student Enrollment Number
                </label>
                <input 
                  type="text" 
                  defaultValue="1049281"
                  className="w-full h-16 pt-6 pb-2 px-4 rounded-xl border border-divider outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-display font-semibold"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary bg-primary/5 p-2 rounded-full">
                  <ICONS.Search size={18} />
                </button>
              </div>

              <div className="relative group opacity-80">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest absolute left-4 top-2 z-10">
                  Student Name
                </label>
                <input 
                  type="text" 
                  disabled
                  defaultValue="Krushna Kumbhar"
                  className="w-full h-16 pt-6 pb-2 px-4 rounded-xl bg-background border border-transparent outline-none font-display font-semibold cursor-not-allowed"
                />
              </div>

              <div className="relative group">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest absolute left-4 top-2 z-10">
                  Hostel Block
                </label>
                <select className="w-full h-16 pt-6 pb-2 px-4 rounded-xl border border-divider outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-display font-semibold appearance-none bg-surface">
                  <option>Hostel A</option>
                  <option>Hostel B</option>
                  <option>Hostel C</option>
                </select>
                <ICONS.ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary rotate-90" size={20} />
              </div>
            </div>
          </motion.section>

          {/* Parcel Information Block */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface rounded-2xl p-6 shadow-sm border border-divider space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            <div className="flex items-center gap-2 mb-2">
              <ICONS.Truck className="text-primary" size={20} fill="currentColor" strokeWidth={1} />
              <h2 className="font-display font-bold text-primary">Parcel Information</h2>
            </div>

            <div className="space-y-4">
              <div className="relative group">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest absolute left-4 top-2 z-10">
                  Courier Name
                </label>
                <select name="courier_name" className="w-full h-16 pt-6 pb-2 px-4 rounded-xl border border-divider outline-none focus:border-primary appearance-none bg-surface font-display font-semibold">
                  <option value="" disabled selected>Select Courier</option>
                  <option>Amazon</option>
                  <option>BlueDart</option>
                  <option>India Post</option>
                  <option>Other</option>
                </select>
                <ICONS.ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary rotate-90" size={20} />
              </div>

              <div className="relative group">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest absolute left-4 top-2 z-10">
                  Courier AWB / Tracking ID
                </label>
                <input 
                  name="awb"
                  type="text" 
                  placeholder="Enter Tracking ID"
                  className="w-full h-16 pt-6 pb-2 px-4 rounded-xl border border-divider outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-display font-semibold"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary p-2 rounded-full hover:bg-background">
                  <ICONS.ScanLine size={18} />
                </button>
              </div>

              <div className="relative group">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest absolute left-4 top-2 z-10">
                  Parcel Description (optional)
                </label>
                <input 
                  name="description"
                  type="text" 
                  placeholder="e.g. Small box, plastic bag"
                  className="w-full h-16 pt-6 pb-2 px-4 rounded-xl border border-divider outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-display font-semibold"
                />
              </div>
            </div>
          </motion.section>

          {/* Action Area */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button 
              type="submit"
              className="w-full h-14 bg-primary text-white font-display font-bold rounded-full flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-xl active:scale-95"
            >
              <ICONS.Send size={20} fill="currentColor" strokeWidth={1} />
              Log Parcel & Notify Student
            </button>
            <p className="text-xs text-text-secondary text-center px-8 leading-relaxed">
              Student will be notified instantly via push notification.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
