import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Shield, 
  FileText,
  Brain,
  Folder,
  BarChart3,
  MessageSquare,
  Home
} from 'lucide-react';

type DockType = 'admin' | 'pod' | 'adviser' | 'beadle' | 'parent';

interface EliteDockProps {
  type: DockType;
}

const dockConfigs: Record<DockType, { icon: typeof LayoutDashboard; path: string; label: string }[]> = {
  admin: [
    { icon: LayoutDashboard, path: '/admin/dashboard', label: 'Dashboard' },
    { icon: Users, path: '/admin/users', label: 'Users' },
    { icon: Shield, path: '/security/privacy', label: 'Security' },
    { icon: Settings, path: '/settings', label: 'Settings' },
  ],
  pod: [
    { icon: LayoutDashboard, path: '/pod/dashboard', label: 'Dashboard' },
    { icon: Folder, path: '/pod/cases', label: 'Cases' },
    { icon: Brain, path: '/ai/insights', label: 'AI' },
    { icon: BarChart3, path: '/ai/trends', label: 'Analytics' },
    { icon: FileText, path: '/docs/incidents', label: 'Docs' },
  ],
  adviser: [
    { icon: LayoutDashboard, path: '/adviser/dashboard', label: 'Dashboard' },
    { icon: Users, path: '/adviser/section', label: 'Section' },
    { icon: FileText, path: '/adviser/logs', label: 'Logs' },
    { icon: MessageSquare, path: '/comm/adviser-pod', label: 'Channel' },
  ],
  beadle: [
    { icon: LayoutDashboard, path: '/beadle/dashboard', label: 'Dashboard' },
    { icon: FileText, path: '/beadle/report', label: 'Report' },
    { icon: Shield, path: '/beadle/safety', label: 'Safety' },
  ],
  parent: [
    { icon: Home, path: '/portal/parent/dashboard', label: 'Home' },
    { icon: Settings, path: '/parent/settings', label: 'Settings' },
  ],
};

const EliteDock = ({ type }: EliteDockProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = dockConfigs[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass-footer flex items-center gap-1 px-2 py-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative p-3 rounded-full transition-all duration-200
                ${isActive 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/50 hover:text-white/80 hover:bg-white/10'
                }
              `}
              aria-label={item.label}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EliteDock;
