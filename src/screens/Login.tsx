import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../App';
import { ICONS } from '../types';

export default function Login() {
  const { login } = useAuth();
  const [roleType, setRoleType] = useState<'student' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(roleType);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-primary-container/20 to-transparent -z-10 rounded-b-[40px]" />
      
      <main className="w-full max-w-md space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-divider mb-6">
            <ICONS.Package className="w-12 h-12 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-2xl font-bold text-primary mb-1">Campus Parcels</h1>
          <p className="text-text-secondary text-sm">MIT-ADT University · Smart Parcel Tracking</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-surface rounded-3xl shadow-xl p-8 border border-divider"
        >
          {/* Segmented Control */}
          <div className="bg-background p-1 rounded-xl flex mb-8 relative">
            <motion.div 
              className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-primary-container rounded-lg shadow-sm"
              animate={{ x: roleType === 'student' ? 0 : '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button 
              onClick={() => setRoleType('student')}
              className={`flex-1 py-2.5 font-display text-sm font-semibold relative z-10 transition-colors ${roleType === 'student' ? 'text-white' : 'text-text-secondary'}`}
            >
              Student
            </button>
            <button 
              onClick={() => setRoleType('admin')}
              className={`flex-1 py-2.5 font-display text-sm font-semibold relative z-10 transition-colors ${roleType === 'admin' ? 'text-white' : 'text-text-secondary'}`}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <ICONS.Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="University Email"
                required
                className="w-full h-14 pl-12 pr-4 bg-background border border-divider rounded-xl outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-all placeholder:text-text-secondary/50"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                <ICONS.Lock size={20} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full h-14 pl-12 pr-12 bg-background border border-divider rounded-xl outline-none focus:border-primary-light focus:ring-1 focus:ring-primary-light transition-all placeholder:text-text-secondary/50"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors"
              >
                {showPassword ? <ICONS.EyeOff size={20} /> : <ICONS.Eye size={20} />}
              </button>
            </div>

            <button 
              type="submit"
              className="w-full h-14 bg-primary text-white rounded-full font-display font-semibold text-base hover:bg-primary/90 active:scale-[0.98] transition-all shadow-md"
            >
              Login
            </button>

            <div className="text-center pt-2">
              <a href="#" className="text-primary text-sm font-medium hover:underline">Forgot password?</a>
            </div>
          </form>
        </motion.div>
      </main>

      <footer className="absolute bottom-8 w-full text-center">
        <p className="text-text-secondary text-xs opacity-60">MIT-ADT University · School of Computing</p>
      </footer>
    </div>
  );
}
