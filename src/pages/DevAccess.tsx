import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Briefcase, User, Settings } from 'lucide-react';
import MinimalistCenterLayout from '@/components/layout/MinimalistCenterLayout';

const roles = [
  {
    id: 'pod',
    title: 'Prefect of Discipline',
    description: 'Manage discipline, cases, and decisions',
    icon: Shield,
    bgColor: 'bg-pod-light',
    borderColor: 'border-pod/20',
    iconColor: 'text-pod',
    buttonColor: 'bg-pod hover:bg-pod/90',
    link: '/pod/welcome',
  },
  {
    id: 'adviser',
    title: 'Class Adviser',
    description: 'Monitor your section, attendance, and students',
    icon: Briefcase,
    bgColor: 'bg-adviser-light',
    borderColor: 'border-adviser/20',
    iconColor: 'text-adviser',
    buttonColor: 'bg-adviser hover:bg-adviser/90',
    link: '/adviser/welcome',
  },
  {
    id: 'beadle',
    title: 'Student Beadle',
    description: 'Report incidents and upload evidence',
    icon: User,
    bgColor: 'bg-beadle-light',
    borderColor: 'border-beadle/20',
    iconColor: 'text-beadle',
    buttonColor: 'bg-beadle hover:bg-beadle/90',
    link: '/beadle/welcome',
  },
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Manage users, settings, and system configuration',
    icon: Settings,
    bgColor: 'bg-admin-light',
    borderColor: 'border-admin/20',
    iconColor: 'text-admin',
    buttonColor: 'bg-admin hover:bg-admin/90',
    link: '/admin/welcome',
  },
];

const DevAccess = () => {
  return (
    <MinimalistCenterLayout>
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            POD AI
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Select Your Role
          </p>
          <p className="text-sm text-muted-foreground mb-12">
            Choose your role to access the system
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
            >
              <div className={`${role.bgColor} ${role.borderColor} border rounded-2xl p-8 text-left h-full flex flex-col`}>
                <div className={`w-14 h-14 rounded-xl ${role.bgColor} flex items-center justify-center mb-5`}>
                  <role.icon className={`w-7 h-7 ${role.iconColor}`} strokeWidth={1.5} />
                </div>
                
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {role.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-6 flex-1">
                  {role.description}
                </p>
                
                <Link
                  to={role.link}
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium transition-all ${role.buttonColor}`}
                >
                  Access {role.id.charAt(0).toUpperCase() + role.id.slice(1)}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MinimalistCenterLayout>
  );
};

export default DevAccess;
