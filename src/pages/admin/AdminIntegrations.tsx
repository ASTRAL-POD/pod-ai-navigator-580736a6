import { motion } from 'framer-motion';
import { Plug, Check, X, RefreshCw, ExternalLink } from 'lucide-react';
import AdminFloatingNav from '@/components/ui/AdminFloatingNav';

const integrations = [
  { id: 1, name: 'Student Information System', status: 'connected', lastSync: '5 min ago', records: 5000 },
  { id: 2, name: 'Learning Management System', status: 'connected', lastSync: '1 hour ago', records: 12500 },
  { id: 3, name: 'Attendance Tracker', status: 'connected', lastSync: '2 min ago', records: 45000 },
  { id: 4, name: 'Parent Portal', status: 'pending', lastSync: 'Never', records: 0 },
  { id: 5, name: 'Transport Management', status: 'error', lastSync: '2 days ago', records: 800 },
];

const statusConfig = {
  connected: { bg: 'bg-emerald-100', text: 'text-emerald-600', icon: Check },
  pending: { bg: 'bg-amber-100', text: 'text-amber-600', icon: RefreshCw },
  error: { bg: 'bg-red-100', text: 'text-red-600', icon: X },
};

const AdminIntegrations = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Integrations</h1>
          <p className="text-[15px] text-gray-600 mt-1">Configure external system integrations and API connections</p>
        </motion.div>

        {/* Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {integrations.map((integration, index) => {
            const config = statusConfig[integration.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <Plug className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                  </div>
                  <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                    <StatusIcon className="w-3 h-3" />
                    {integration.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{integration.name}</h3>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Last sync: {integration.lastSync}</span>
                  <span>{integration.records.toLocaleString()} records</span>
                </div>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
                    Sync Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-2 px-4 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* API Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'API Calls Today', value: '12,458', status: 'Normal load' },
            { label: 'Avg Response Time', value: '145ms', status: 'Healthy' },
            { label: 'Success Rate', value: '99.7%', status: 'Excellent' },
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

export default AdminIntegrations;
