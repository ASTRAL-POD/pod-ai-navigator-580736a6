import { motion } from 'framer-motion';
import { FileText, ChevronRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import AdminFloatingNav from '@/components/ui/AdminFloatingNav';

const policies = [
  { id: 1, name: 'Student Code of Conduct', version: '3.2', status: 'active', lastUpdated: '2024-01-15', category: 'Discipline' },
  { id: 2, name: 'Attendance Policy', version: '2.1', status: 'active', lastUpdated: '2024-02-01', category: 'Attendance' },
  { id: 3, name: 'Anti-Bullying Guidelines', version: '4.0', status: 'active', lastUpdated: '2024-01-20', category: 'Safety' },
  { id: 4, name: 'Device Usage Policy', version: '1.5', status: 'draft', lastUpdated: '2024-03-10', category: 'Technology' },
  { id: 5, name: 'Parent Communication Protocol', version: '2.0', status: 'review', lastUpdated: '2024-03-05', category: 'Communication' },
];

const statusConfig = {
  active: { bg: 'bg-emerald-100', text: 'text-emerald-600', icon: CheckCircle },
  draft: { bg: 'bg-gray-100', text: 'text-gray-600', icon: FileText },
  review: { bg: 'bg-amber-100', text: 'text-amber-600', icon: AlertCircle },
};

const AdminPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Policy Management</h1>
          <p className="text-[15px] text-gray-600 mt-1">Define and manage school discipline policies and guidelines</p>
        </motion.div>

        {/* Policy Cards */}
        <div className="space-y-4">
          {policies.map((policy, index) => {
            const config = statusConfig[policy.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            
            return (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-[15px] font-semibold text-gray-900">{policy.name}</h3>
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          v{policy.version}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm text-gray-500">{policy.category}</span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {policy.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                      <StatusIcon className="w-3 h-3" />
                      {policy.status}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Active Policies', value: '12', status: 'All compliant' },
            { label: 'Pending Review', value: '3', status: 'Awaiting approval' },
            { label: 'Last Update', value: '2 days', status: 'ago' },
          ].map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm">
              <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-[15px] text-gray-600 mt-1">{stat.status}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <AdminFloatingNav />
    </div>
  );
};

export default AdminPolicy;
