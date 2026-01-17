import { motion } from 'framer-motion';
import { Mail, Clock, Bus } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import FloatingDock from '@/components/ui/FloatingDock';

const waveformData = [
  { time: '07:00', count: 2 },
  { time: '07:15', count: 5 },
  { time: '07:30', count: 12 },
  { time: '07:45', count: 28 },
  { time: '08:00', count: 45 },
  { time: '08:15', count: 32 },
  { time: '08:30', count: 15 },
  { time: '08:45', count: 6 },
  { time: '09:00', count: 2 },
];

const topOffenders = [
  { id: 1, name: 'Tyler Martinez', grade: '10', frequency: 18, avgMinutes: 12, reason: 'Bus Route 12A' },
  { id: 2, name: 'Jessica Wong', grade: '9', frequency: 15, avgMinutes: 8, reason: 'Personal Transport' },
  { id: 3, name: 'Brandon Smith', grade: '11', frequency: 14, avgMinutes: 15, reason: 'Bus Route 7B' },
  { id: 4, name: 'Amanda Cruz', grade: '10', frequency: 12, avgMinutes: 6, reason: 'Walking' },
  { id: 5, name: 'Kevin Park', grade: '9', frequency: 11, avgMinutes: 10, reason: 'Bus Route 12A' },
];

const busDelays = [
  { route: 'Route 12A', delay: '+8 min', status: 'delayed' },
  { route: 'Route 7B', delay: '+12 min', status: 'delayed' },
  { route: 'Route 3C', delay: 'On Time', status: 'ontime' },
];

const IntegrationLatePatterns = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Late Arrival Patterns</h1>
          <p className="text-[15px] text-gray-600 mt-1">Analyze patterns of late arrivals and their impact on behavior</p>
        </motion.div>

        {/* Time Waveform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Tardy Distribution</h2>
          <p className="text-[15px] text-gray-600 mb-6">Morning arrival window: 07:00 - 09:00</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waveformData}>
                <defs>
                  <linearGradient id="tardyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
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
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  fill="url(#tardyGradient)" 
                  name="Tardy Count"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">Peak tardy window: 07:45 - 08:15</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Offenders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Top 5 Repeat Offenders</h2>
              <p className="text-sm text-gray-500 mt-1">This semester</p>
            </div>
            <div className="divide-y divide-gray-100">
              {topOffenders.map((student, index) => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-amber-700">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-500">Grade {student.grade} • {student.reason}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                      {student.frequency}x late
                    </span>
                    <span className="text-sm text-gray-500">Avg {student.avgMinutes} min</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bus Delay Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Bus className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold text-gray-900">Bus Delays</h3>
              </div>
              <div className="space-y-3">
                {busDelays.map((bus, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-[15px] text-gray-900">{bus.route}</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                      <span className={`text-sm font-medium ${
                        bus.status === 'delayed' ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {bus.delay}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-[15px] text-gray-600">Total Tardies Today</span>
                  <span className="text-[15px] font-bold text-blue-600">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[15px] text-gray-600">Bus-Related</span>
                  <span className="text-[15px] font-bold text-amber-600">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[15px] text-gray-600">Week Average</span>
                  <span className="text-[15px] font-bold text-gray-900">42</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <FloatingDock 
        backPath="/pod/dashboard" 
        title="Punctuality"
        actionIcon={Mail}
        onAction={() => console.log('Notify parents')}
      />
    </div>
  );
};

export default IntegrationLatePatterns;
