import { motion } from 'framer-motion';
import { 
  FileText, 
  Mic, 
  Upload, 
  EyeOff, 
  TrendingUp, 
  MessageCircle, 
  Shield,
  UserCheck
} from 'lucide-react';
import NavigationCard from '@/components/navigation/NavigationCard';
import DashboardLayout from '@/components/layout/DashboardLayout';

const navItems = [
  { to: '/beadle/report', icon: FileText, label: 'New Report', description: 'Submit incident' },
  { to: '/beadle/voice-report', icon: Mic, label: 'Voice Report', description: 'Record audio' },
  { to: '/beadle/evidence', icon: Upload, label: 'Upload Evidence', description: 'Add media' },
  { to: '/beadle/confidential', icon: EyeOff, label: 'Confidential', description: 'Anonymous' },
  { to: '/beadle/status', icon: TrendingUp, label: 'Track Status', description: 'View progress' },
  { to: '/beadle/feedback', icon: MessageCircle, label: 'Feedback', description: 'Updates' },
  { to: '/beadle/safety', icon: Shield, label: 'Safety Info', description: 'Guidelines' },
];

const stats = [
  { label: 'Reports Sent', value: '12' },
  { label: 'Pending', value: '2' },
  { label: 'Resolved', value: '10' },
];

const BeadleDashboard = () => {
  return (
    <DashboardLayout dockType="beadle">
      <div className="h-full flex flex-col py-6 overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-header flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <UserCheck className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white/95">Report Station</h1>
              <p className="text-xs text-white/50">Student Beadle Dashboard</p>
            </div>
          </div>
        </motion.header>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass-panel rounded-lg p-3 text-center">
              <div className="text-lg font-semibold text-white/90">{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Navigation Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {navItems.map((item, index) => (
              <NavigationCard
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default BeadleDashboard;
