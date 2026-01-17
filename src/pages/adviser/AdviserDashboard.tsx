import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  Users, 
  BookOpen, 
  Flag, 
  Folder, 
  Edit, 
  BarChart, 
  MessageSquare 
} from 'lucide-react';
import MinimalistCenterLayout from '@/components/layout/MinimalistCenterLayout';
import NavigationCard from '@/components/navigation/NavigationCard';

const navItems = [
  { to: '/adviser/attendance', icon: CheckSquare, label: 'Attendance', description: 'Track daily attendance', iconColor: 'text-adviser' },
  { to: '/adviser/section', icon: Users, label: 'My Section', description: 'View class roster', iconColor: 'text-pod' },
  { to: '/adviser/logs', icon: BookOpen, label: 'Observation Logs', description: 'Record observations', iconColor: 'text-admin' },
  { to: '/adviser/early-concerns', icon: Flag, label: 'Early Concerns', description: 'Flag potential issues', iconColor: 'text-destructive' },
  { to: '/adviser/cases', icon: Folder, label: 'Assigned Cases', description: 'Cases for your section', iconColor: 'text-pod' },
  { to: '/adviser/student-update', icon: Edit, label: 'Student Updates', description: 'Update student info', iconColor: 'text-muted-foreground' },
  { to: '/adviser/absence-analytics', icon: BarChart, label: 'Absence Analytics', description: 'Attendance trends', iconColor: 'text-beadle' },
  { to: '/comm/adviser-pod', icon: MessageSquare, label: 'Communication', description: 'Message POD office', iconColor: 'text-pod' },
];

const AdviserDashboard = () => {
  return (
    <MinimalistCenterLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Adviser Portal
          </h1>
          <p className="text-muted-foreground">
            Class Adviser Dashboard
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navItems.map((item, index) => (
            <NavigationCard
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              description={item.description}
              iconColor={item.iconColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </MinimalistCenterLayout>
  );
};

export default AdviserDashboard;
