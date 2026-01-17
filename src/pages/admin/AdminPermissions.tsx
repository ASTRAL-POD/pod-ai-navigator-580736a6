import { motion } from 'framer-motion';
import { Shield, Eye, Edit, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const roles = [
  { id: 1, name: 'Administrator', users: 3 },
  { id: 2, name: 'Coordinator', users: 8 },
  { id: 3, name: 'Adviser', users: 45 },
  { id: 4, name: 'Beadle', users: 120 },
  { id: 5, name: 'Parent', users: 2500 },
  { id: 6, name: 'Student', users: 5000 },
];

const permissions = [
  { module: 'Student Records', view: true, edit: true, delete: false },
  { module: 'Incident Reports', view: true, edit: true, delete: true },
  { module: 'Attendance Data', view: true, edit: false, delete: false },
  { module: 'AI Insights', view: true, edit: false, delete: false },
  { module: 'System Settings', view: false, edit: false, delete: false },
];

const AdminPermissions = () => {
  return (
    <DashboardLayout dockType="admin">
      <div className="h-full flex flex-col py-6 overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-header mb-4"
        >
          <h1 className="text-xl font-semibold text-white/95">Permission Matrix</h1>
          <p className="text-xs text-white/50">Configure role-based access control</p>
        </motion.header>

        {/* Role Cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-6 gap-2 mb-4"
        >
          {roles.map((role) => (
            <div
              key={role.id}
              className="nav-card p-3 text-center"
            >
              <Shield className="w-5 h-5 text-white/60 mx-auto mb-2" />
              <p className="text-sm font-medium text-white/80">{role.name}</p>
              <p className="text-xs text-white/40">{role.users.toLocaleString()}</p>
            </div>
          ))}
        </motion.div>

        {/* Permission Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex-1 glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-4 border-b border-white/10">
            <h2 className="font-medium text-white/80">Adviser Permissions</h2>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 pb-3 border-b border-white/10">
              <span className="text-xs font-medium text-white/40 uppercase">Module</span>
              <span className="text-xs font-medium text-white/40 uppercase text-center">View</span>
              <span className="text-xs font-medium text-white/40 uppercase text-center">Edit</span>
              <span className="text-xs font-medium text-white/40 uppercase text-center">Delete</span>
            </div>
            
            {permissions.map((perm) => (
              <div
                key={perm.module}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-3 border-b border-white/5 items-center"
              >
                <span className="text-sm text-white/80">{perm.module}</span>
                <div className="flex justify-center">
                  <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    perm.view ? 'bg-green-400/20 text-green-400' : 'bg-white/5 text-white/30'
                  }`}>
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-center">
                  <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    perm.edit ? 'bg-white/15 text-white/80' : 'bg-white/5 text-white/30'
                  }`}>
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-center">
                  <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    perm.delete ? 'bg-red-400/20 text-red-400' : 'bg-white/5 text-white/30'
                  }`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPermissions;
