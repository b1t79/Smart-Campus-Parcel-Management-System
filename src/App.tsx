import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, createContext, useContext } from 'react';
import Login from './screens/Login';
import StudentDashboard from './screens/StudentDashboard';
import AdminDashboard from './screens/AdminDashboard';
import ParcelDetails from './screens/ParcelDetails';
import AddParcel from './screens/AddParcel';
import AdminParcels from './screens/AdminParcels';
import AdminReports from './screens/AdminReports';
import StudentAlerts from './screens/StudentAlerts';
import StudentProfile from './screens/StudentProfile';
import { MOCK_PARCELS, Parcel } from './types';

type AuthRole = 'student' | 'admin' | null;

interface AuthContextType {
  role: AuthRole;
  login: (role: AuthRole) => void;
  logout: () => void;
  parcels: Parcel[];
  markCollected: (id: string) => void;
  addParcel: (parcel: Parcel) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default function App() {
  const [role, setRole] = useState<AuthRole>(null);
  const [parcels, setParcels] = useState<Parcel[]>(MOCK_PARCELS);

  const login = (role: AuthRole) => setRole(role);
  const logout = () => setRole(null);

  const markCollected = (id: string) => {
    setParcels(prev => prev.map(p => 
      p.id === id ? { 
        ...p, 
        status: 'Collected',
        history: [...p.history.map(h => h.event === 'Collected' ? { ...h, completed: true, time: new Date().toLocaleString() } : h)]
      } : p
    ));
  };

  const addParcel = (parcel: Parcel) => {
    setParcels(prev => [parcel, ...prev]);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout, parcels, markCollected, addParcel }}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={!role ? <Login /> : <Navigate to="/" />} />
            
            <Route path="/" element={
              role === 'student' ? <StudentDashboard /> : 
              role === 'admin' ? <AdminDashboard /> : 
              <Navigate to="/login" />
            } />

            <Route path="/parcel/:id" element={role ? <ParcelDetails /> : <Navigate to="/login" />} />
            
            {/* Admin Routes */}
            <Route path="/admin/add" element={role === 'admin' ? <AddParcel /> : <Navigate to="/login" />} />
            <Route path="/admin/parcels" element={role === 'admin' ? <AdminParcels /> : <Navigate to="/login" />} />
            <Route path="/admin/reports" element={role === 'admin' ? <AdminReports /> : <Navigate to="/login" />} />

            {/* Student Routes */}
            <Route path="/student/alerts" element={role === 'student' ? <StudentAlerts /> : <Navigate to="/login" />} />
            <Route path="/student/profile" element={role === 'student' ? <StudentProfile /> : <Navigate to="/login" />} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
