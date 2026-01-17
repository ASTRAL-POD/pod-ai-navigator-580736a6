import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Users, Key, FileSearch, Sliders } from 'lucide-react';
import MinimalistCenterLayout from '@/components/layout/MinimalistCenterLayout';

const features = [
  { icon: Users, text: 'Manage user accounts' },
  { icon: Key, text: 'Configure permissions' },
  { icon: FileSearch, text: 'Review audit logs' },
  { icon: Sliders, text: 'System settings' },
];

const AdminWelcome = () => {
  return (
    <MinimalistCenterLayout>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 mx-auto bg-admin-light rounded-3xl flex items-center justify-center mb-8"
        >
          <Settings className="w-16 h-16 text-admin" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
        >
          Welcome to Admin Panel
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
        >
          Manage system settings, user accounts, permissions, and ensure data security 
          and compliance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-left"
            >
              <feature.icon className="w-5 h-5 text-admin flex-shrink-0" />
              <span className="text-sm text-foreground">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <Link
            to="/admin/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-admin text-white font-medium text-lg hover:bg-admin/90 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Role Selection
          </Link>
        </motion.div>
      </div>
    </MinimalistCenterLayout>
  );
};

export default AdminWelcome;
