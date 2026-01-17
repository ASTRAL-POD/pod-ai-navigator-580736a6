import { motion } from 'framer-motion';
import { ClipboardList, Check, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import AdminFloatingNav from '@/components/ui/AdminFloatingNav';

const fairnessScore = 82;

const gaugeData = [
  { value: fairnessScore, color: fairnessScore >= 80 ? '#10B981' : fairnessScore >= 60 ? '#F59E0B' : '#EF4444' },
  { value: 100 - fairnessScore, color: '#E5E7EB' },
];

const decisions = [
  { id: 1, student: 'Marcus Chen', logic: 'Pattern A: 3+ tardies in 5 days', timestamp: '2 hours ago', confidence: 0.87, category: 'Attendance' },
  { id: 2, student: 'Sarah Williams', logic: 'Pattern B: Escalating incident severity', timestamp: '3 hours ago', confidence: 0.72, category: 'Behavior' },
  { id: 3, student: 'David Park', logic: 'Pattern C: Peer association network', timestamp: '5 hours ago', confidence: 0.65, category: 'Social' },
  { id: 4, student: 'Emily Torres', logic: 'Pattern A: 3+ tardies in 5 days', timestamp: '6 hours ago', confidence: 0.91, category: 'Attendance' },
  { id: 5, student: 'James Liu', logic: 'Pattern D: Grade decline + behavior', timestamp: '8 hours ago', confidence: 0.78, category: 'Academic' },
];

const AdminBiasReview = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Bias Review</h1>
          <p className="text-[15px] text-gray-600 mt-1">Review AI recommendations for potential bias and ensure fairness</p>
        </motion.div>

        {/* Fairness Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-900 text-center mb-2">AI Fairness Score</h2>
          <p className="text-[15px] text-gray-600 text-center mb-6">Based on demographic parity analysis</p>
          
          <div className="flex justify-center">
            <div className="w-64 h-32 relative">
              <ResponsiveContainer width="100%" height="200%">
                <PieChart>
                  <Pie
                    data={gaugeData}
                    innerRadius={70}
                    outerRadius={90}
                    startAngle={180}
                    endAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
                <span className="text-4xl font-bold text-gray-900">{fairnessScore}</span>
                <span className="text-sm text-gray-500">out of 100</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-gray-600">0-60 Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-600">60-80 Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-gray-600">80-100 Fair</span>
            </div>
          </div>
        </motion.div>

        {/* Decision Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">AI Decision Feed</h2>
            <p className="text-sm text-gray-500 mt-1">Review and validate automated flags</p>
          </div>
          <div className="divide-y divide-gray-100">
            {decisions.map((decision, index) => (
              <motion.div
                key={decision.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {decision.student.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-[15px] font-medium text-gray-900">{decision.student}</p>
                      <p className="text-[15px] text-gray-600 mt-1">Flagged via {decision.logic}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">{decision.timestamp}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                          {decision.category}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          decision.confidence >= 0.8 ? 'bg-emerald-100 text-emerald-700' :
                          decision.confidence >= 0.7 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {Math.round(decision.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium hover:bg-emerald-600 transition-colors"
                    >
                      <Check className="w-4 h-4" strokeWidth={2} />
                      Confirm
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" strokeWidth={2} />
                      Override
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AdminFloatingNav />
    </div>
  );
};

export default AdminBiasReview;
