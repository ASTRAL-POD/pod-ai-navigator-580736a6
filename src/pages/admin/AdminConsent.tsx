import { motion } from 'framer-motion';
import { RefreshCw, Camera, Database, Bus, Heart, ShieldAlert } from 'lucide-react';
import AdminFloatingNav from '@/components/ui/AdminFloatingNav';

const consentCategories = [
  { id: 1, name: 'Photo & Video', icon: Camera, completion: 94, total: 5000, consented: 4700 },
  { id: 2, name: 'Data Processing', icon: Database, completion: 87, total: 5000, consented: 4350 },
  { id: 3, name: 'Transport Tracking', icon: Bus, completion: 76, total: 5000, consented: 3800 },
  { id: 4, name: 'Health Records', icon: Heart, completion: 82, total: 5000, consented: 4100 },
];

const missingConsent = [
  { id: 1, name: 'Tyler Martinez', grade: '10', missing: ['Health Records', 'Transport Tracking'] },
  { id: 2, name: 'Jessica Wong', grade: '9', missing: ['Data Processing'] },
  { id: 3, name: 'Brandon Smith', grade: '11', missing: ['Health Records', 'Photo & Video'] },
  { id: 4, name: 'Amanda Cruz', grade: '10', missing: ['Transport Tracking'] },
];

const AdminConsent = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Consent Management</h1>
          <p className="text-[15px] text-gray-600 mt-1">Manage parental and student consent records for data processing</p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consentCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  category.completion >= 90 ? 'bg-emerald-100 text-emerald-700' :
                  category.completion >= 80 ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {category.completion >= 90 ? 'Complete' : category.completion >= 80 ? 'Nearly Complete' : 'Action Needed'}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">{category.completion}%</p>
              <div className="space-y-2">
                <div className="bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.completion}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={`h-2 rounded-full ${
                      category.completion >= 90 ? 'bg-emerald-500' :
                      category.completion >= 80 ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}
                  />
                </div>
                <p className="text-sm text-gray-500">{category.consented.toLocaleString()} of {category.total.toLocaleString()} students</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Missing Consent Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50 border-l-4 border-red-500 rounded-3xl overflow-hidden"
        >
          <div className="p-6 border-b border-red-100">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600" strokeWidth={1.5} />
              <h2 className="text-lg font-semibold text-red-900">Critical Missing Consent</h2>
            </div>
            <p className="text-[15px] text-red-700 mt-1">These students require immediate consent verification</p>
          </div>
          <div className="divide-y divide-red-100">
            {missingConsent.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5 text-red-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">Grade {student.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {student.missing.map((item, i) => (
                    <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Total Records', value: '5,000', status: 'Active students' },
            { label: 'Fully Compliant', value: '3,420', status: '68.4% of population' },
            { label: 'Pending Review', value: '187', status: 'Awaiting verification' },
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

export default AdminConsent;
