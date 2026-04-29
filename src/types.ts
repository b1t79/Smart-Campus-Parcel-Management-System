import { 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  User,
  ShieldCheck,
  Building,
  Bell,
  LayoutDashboard,
  FileText,
  LogOut,
  ChevronRight,
  Search,
  Plus,
  Filter,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  QrCode,
  History,
  ScanLine,
  Send,
  Phone
} from 'lucide-react';

export type ParcelStatus = 'Pending' | 'At Gate' | 'At Office' | 'Ready' | 'Collected';

export interface Parcel {
  id: string;
  courier: string;
  trackingId: string;
  recipient: string;
  location: string;
  destination: string;
  status: ParcelStatus;
  updatedAt: string;
  createdAt: string;
  history: {
    event: string;
    time: string;
    completed: boolean;
  }[];
}

export const MOCK_PARCELS: Parcel[] = [
  {
    id: '1',
    courier: 'Amazon',
    trackingId: 'PKT-2024-087',
    recipient: 'Krushna Kumbhar',
    location: 'Main Gate',
    destination: 'Hostel A, Room 204',
    status: 'Ready',
    updatedAt: '11:15 AM',
    createdAt: '10:32 AM',
    history: [
      { event: 'Arrived at Main Gate', time: '24 Apr 2026, 10:32 AM', completed: true },
      { event: 'Stored at Hostel Office', time: '24 Apr 2026, 11:15 AM', completed: true },
      { event: 'Ready for Collection', time: 'Awaiting your pickup', completed: true },
      { event: 'Collected', time: 'Pending', completed: false },
    ]
  },
  {
    id: '2',
    courier: 'BlueDart',
    trackingId: 'PKT-2024-091',
    recipient: 'Amit Sharma',
    location: 'Main Gate',
    destination: 'Hostel B, Room 102',
    status: 'At Gate',
    updatedAt: '09:45 AM',
    createdAt: '09:45 AM',
    history: [
      { event: 'Arrived at Main Gate', time: '24 Apr 2026, 09:45 AM', completed: true },
      { event: 'Stored at Hostel Office', time: 'Pending', completed: false },
      { event: 'Ready for Collection', time: 'Pending', completed: false },
      { event: 'Collected', time: 'Pending', completed: false },
    ]
  },
  {
    id: '3',
    courier: 'India Post',
    trackingId: 'PKT-2024-095',
    recipient: 'Sneha Patil',
    location: 'Hostel Office',
    destination: 'Hostel A, Room 305',
    status: 'Ready',
    updatedAt: '10:00 AM',
    createdAt: '08:30 AM',
    history: [
      { event: 'Arrived at Main Gate', time: '24 Apr 2026, 08:30 AM', completed: true },
      { event: 'Stored at Hostel Office', time: '24 Apr 2026, 10:00 AM', completed: true },
      { event: 'Ready for Collection', time: 'Awaiting your pickup', completed: true },
      { event: 'Collected', time: 'Pending', completed: false },
    ]
  }
];

export const ICONS = {
  Package, Truck, MapPin, CheckCircle2, Clock, ArrowRight, User, ShieldCheck, Building,
  Bell, LayoutDashboard, FileText, LogOut, ChevronRight, Search, Plus, Filter, ArrowLeft,
  Eye, EyeOff, Mail, Lock, QrCode, History, ScanLine, Send, Phone
};
