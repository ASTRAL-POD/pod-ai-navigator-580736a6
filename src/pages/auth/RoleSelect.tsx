import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Briefcase, 
  UserCheck, 
  GraduationCap, 
  Heart 
} from 'lucide-react';

const roles = [
  {
    id: 'admin',
    title: 'Administrator',
    description: 'Full system access',
    icon: Shield,
    path: '/auth/admin-production',
  },
  {
    id: 'coordinator',
    title: 'Coordinator (PoD)',
    description: 'Discipline oversight',
    icon: Users,
    path: '/portal/coordinator',
  },
  {
    id: 'adviser',
    title: 'Adviser',
    description: 'Class management',
    icon: Briefcase,
    path: '/portal/adviser',
  },
  {
    id: 'beadle',
    title: 'Beadle',
    description: 'Incident reporting',
    icon: UserCheck,
    path: '/portal/beadle',
  },
  {
    id: 'student',
    title: 'Student',
    description: 'View rules & alerts',
    icon: GraduationCap,
    path: '/portal/student',
  },
  {
    id: 'parent',
    title: 'Parent',
    description: 'Monitor records',
    icon: Heart,
    path: '/portal/parent',
  },
];

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex items-center justify-center">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* 70% Focus Column */}
      <div className="w-[70vw] max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-white/70 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            System Online
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-semibold text-white/95 mb-2">
            Select Your Role
          </h1>
          <p className="text-white/50 text-sm">
            Choose your access level to continue
          </p>
        </motion.div>

        {/* Role Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {roles.map((role, index) => {
            const Icon = role.icon;

            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate(role.path)}
                className="glass-panel rounded-xl p-4 text-left group transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/15 transition-colors">
                    <Icon className="w-5 h-5 text-white/80" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white/90 text-sm">{role.title}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{role.description}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-white/30 text-xs">Secure multi-factor authentication enabled</p>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelect;
