import { motion } from 'framer-motion';
import { 
  Users, 
  Key, 
  Settings, 
  FileSearch, 
  Lock, 
  Cpu, 
  Database, 
  Plug 
} from 'lucide-react';
import NavigationCard from '@/components/navigation/NavigationCard';
import DashboardLayout from '@/components/layout/DashboardLayout';

const navItems = [
  { to: '/admin/users', icon: Users, label: 'User Management', description: 'Manage accounts' },
  { to: '/admin/permissions', icon: Key, label: 'Permissions', description: 'Configure access' },
  { to: '/settings', icon: Settings, label: 'System Settings', description: 'Configure system' },
  { to: '/pod/audit-logs', icon: FileSearch, label: 'Audit Logs', description: 'Review activity' },
  { to: '/security/privacy', icon: Lock, label: 'Security', description: 'Privacy controls' },
  { to: '/ai/config', icon: Cpu, label: 'AI Configuration', description: 'Configure AI models' },
  { to: '/admin/retention', icon: Database, label: 'Data Retention', description: 'Manage data lifecycle' },
  { to: '/admin/integrations', icon: Plug, label: 'Integrations', description: 'External connections' },
];

const stats = [
  { label: 'Active Users', value: '2,847' },
  { label: 'System Uptime', value: '99.9%' },
  { label: 'Total Cases', value: '1,234' },
  { label: 'Pending Actions', value: '23' },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout dockType="admin">
      <div className="h-full flex flex-col py-6 overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-header flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="text-xl font-semibold text-white/95">Admin Panel</h1>
            <p className="text-xs text-white/50">System Administrator</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/60">Online</span>
          </div>
        </motion.header>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-6"
        >
          {stats.map((stat, i) => (
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
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

export default AdminDashboard;
