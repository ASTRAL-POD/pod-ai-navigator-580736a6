import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MoreHorizontal, X, Clock, CheckCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const mockUsers = [
  { id: 1, name: 'Dr. Sarah Mitchell', email: 'sarah.m@school.edu', role: 'Administrator', status: 'active', lastAuth: '2 min ago', avatar: 'SM' },
  { id: 2, name: 'James Anderson', email: 'james.a@school.edu', role: 'Coordinator', status: 'active', lastAuth: '1 hour ago', avatar: 'JA' },
  { id: 3, name: 'Maria Garcia', email: 'maria.g@school.edu', role: 'Adviser', status: 'active', lastAuth: '3 hours ago', avatar: 'MG' },
  { id: 4, name: 'David Chen', email: 'david.c@school.edu', role: 'Adviser', status: 'pending', lastAuth: 'Never', avatar: 'DC' },
  { id: 5, name: 'Emma Thompson', email: 'emma.t@school.edu', role: 'Beadle', status: 'active', lastAuth: 'Yesterday', avatar: 'ET' },
  { id: 6, name: 'Michael Park', email: 'michael.p@school.edu', role: 'Parent', status: 'inactive', lastAuth: '2 weeks ago', avatar: 'MP' },
];

const roleColors: Record<string, string> = {
  Administrator: 'bg-white/15 text-white/80',
  Coordinator: 'bg-white/15 text-white/80',
  Adviser: 'bg-white/15 text-white/80',
  Beadle: 'bg-white/15 text-white/80',
  Parent: 'bg-white/10 text-white/60',
  Student: 'bg-white/10 text-white/60',
};

const statusColors: Record<string, { dot: string }> = {
  active: { dot: 'bg-green-400' },
  pending: { dot: 'bg-yellow-400' },
  inactive: { dot: 'bg-white/30' },
};

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout dockType="admin">
      <div className="h-full flex flex-col py-6 overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-header flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="text-xl font-semibold text-white/95">System Personnel</h1>
            <p className="text-xs text-white/50">Access Control</p>
          </div>
        </motion.header>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-4"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full glass-panel rounded-lg px-10 py-2.5 text-sm text-white/90 placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/20"
          />
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 overflow-y-auto glass-panel rounded-xl"
        >
          <div className="divide-y divide-white/5">
            {filteredUsers.map((user, idx) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + idx * 0.03 }}
                onClick={() => setSelectedUser(user)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium text-white/70">
                  {user.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/90 truncate">{user.name}</p>
                  <p className="text-xs text-white/50 truncate">{user.email}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${roleColors[user.role]}`}>
                  {user.role}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${statusColors[user.status].dot}`} />
                </span>
                <div className="flex items-center gap-1 text-xs text-white/40">
                  <Clock className="w-3 h-3" />
                  {user.lastAuth}
                </div>
                <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-white/40" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar Panel */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] glass-panel-dark border-l border-white/10 z-50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-white/90">Edit User</h2>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white/60" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-lg font-medium text-white/70">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-white/90">{selectedUser.name}</p>
                    <p className="text-xs text-white/50">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <button className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white/80 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button className="w-full py-2.5 text-red-400 hover:bg-red-400/10 rounded-lg text-sm font-medium transition-colors">
                    Revoke Access
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
