import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import AdminFloatingNav from '@/components/ui/AdminFloatingNav';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const histogramData = [
  { age: '1 mo', count: 4200 },
  { age: '6 mo', count: 8500 },
  { age: '1 yr', count: 12300 },
  { age: '2 yr', count: 6800 },
  { age: '3 yr+', count: 3200 },
];

const retentionPolicies = [
  { id: 1, name: 'Minor Infractions', days: 180, description: 'Tardies, uniform violations, minor disruptions' },
  { id: 2, name: 'Moderate Incidents', days: 365, description: 'Repeated minor offenses, property damage' },
  { id: 3, name: 'Severe Violations', days: -1, description: 'Suspensions, expulsions, legal matters' },
  { id: 4, name: 'Attendance Records', days: 730, description: 'Daily attendance logs and patterns' },
];

const AdminRetention = () => {
  const [sliderValues, setSliderValues] = useState<Record<number, number>>(
    Object.fromEntries(retentionPolicies.map(p => [p.id, p.days === -1 ? 1095 : p.days]))
  );

  const formatDays = (days: number) => {
    if (days >= 1095) return 'Forever';
    if (days >= 365) return `${Math.round(days / 365)} Year${days >= 730 ? 's' : ''}`;
    return `${days} Days`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Data Retention</h1>
          <p className="text-[15px] text-gray-600 mt-1">Configure data retention policies and manage data lifecycle</p>
        </motion.div>

        {/* Data Age Histogram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Data Age Distribution</h2>
          <p className="text-[15px] text-gray-600 mb-6">Records by age category</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData}>
                <XAxis 
                  dataKey="age" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }} 
                />
                <Bar 
                  dataKey="count" 
                  fill="#9CA3AF" 
                  radius={[8, 8, 0, 0]}
                  name="Records"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Retention Sliders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Retention Policies</h2>
            <div className="space-y-8">
              {retentionPolicies.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <p className="text-[15px] font-medium text-gray-900">{policy.name}</p>
                      <p className="text-sm text-gray-500">{policy.description}</p>
                    </div>
                    <span className="text-[15px] font-bold text-blue-600">
                      {formatDays(sliderValues[policy.id])}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="1095"
                    value={sliderValues[policy.id]}
                    onChange={(e) => setSliderValues(prev => ({ ...prev, [policy.id]: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                    style={{
                      background: `linear-gradient(to right, #2563EB 0%, #2563EB ${(sliderValues[policy.id] - 30) / (1095 - 30) * 100}%, #E5E7EB ${(sliderValues[policy.id] - 30) / (1095 - 30) * 100}%, #E5E7EB 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>30 days</span>
                    <span>Forever</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Storage Gauge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-4xl font-bold text-gray-900">4.2 TB</p>
                    <p className="text-[15px] text-gray-500">of 10 TB used</p>
                  </div>
                  <p className="text-lg font-semibold text-emerald-600">42%</p>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)'
                    }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">1.8 TB</p>
                    <p className="text-xs text-gray-500">Documents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">1.2 TB</p>
                    <p className="text-xs text-gray-500">Media</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">1.2 TB</p>
                    <p className="text-xs text-gray-500">Logs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Purge Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-red-500 text-white rounded-full px-8 py-4 font-semibold shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                  Purge Expired Data
                </motion.button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-3xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    Confirm Data Purge
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-[15px]">
                    This action will permanently delete all records that exceed their retention period. 
                    This cannot be undone. Estimated records to be deleted: <strong>3,247</strong>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-500 hover:bg-red-600 rounded-full">
                    Confirm Purge
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>
        </div>
      </div>

      <AdminFloatingNav />
    </div>
  );
};

export default AdminRetention;
