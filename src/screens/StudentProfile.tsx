import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { ICONS } from '../types';

export default function StudentProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const student = {
    name: 'Krushna Kumbhar',
    enrollment: '1049281',
    email: 'krushna.k@mitadt.edu.in',
    hostel: 'Hostel A, Room 204',
    phone: '+91 98765 43210'
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-divider h-16 flex items-center px-4 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-background rounded-full transition-all">
          <ICONS.ArrowLeft size={24} className="text-primary" />
        </button>
        <h1 className="flex-1 text-primary font-display font-bold text-lg ml-2">My Profile</h1>
      </header>

      <main className="pt-24 px-4 pb-24 space-y-6 max-w-md mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-divider text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-primary-container/10 -z-10" />
          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-lg mb-4 ring-2 ring-primary/10">
            <ICONS.User size={48} className="text-primary opacity-20" />
          </div>
          <h2 className="font-display font-bold text-xl text-primary">{student.name}</h2>
          <p className="text-sm text-text-secondary font-medium tracking-wide">Enrollment: {student.enrollment}</p>
        </motion.div>

        <section className="bg-white rounded-2xl shadow-sm border border-divider divide-y divide-divider overflow-hidden">
          <div className="p-4 flex items-center gap-4">
            <ICONS.Mail className="text-text-secondary" size={18} />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary/60 tracking-wider">Email</p>
              <p className="text-sm font-semibold">{student.email}</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <ICONS.Building className="text-text-secondary" size={18} />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary/60 tracking-wider">Hostel</p>
              <p className="text-sm font-semibold">{student.hostel}</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <ICONS.Phone className="text-text-secondary" size={18} />
            <div>
              <p className="text-[10px] uppercase font-bold text-text-secondary/60 tracking-wider">Phone</p>
              <p className="text-sm font-semibold">{student.phone}</p>
            </div>
          </div>
        </section>

        <button 
          onClick={logout}
          className="w-full h-14 bg-red-50 text-red-500 rounded-2xl font-display font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-[0.98]"
        >
          <ICONS.LogOut size={20} />
          Sign Out
        </button>
      </main>
    </div>
  );
}
