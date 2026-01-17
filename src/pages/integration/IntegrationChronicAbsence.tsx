import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import FloatingDock from '@/components/ui/FloatingDock';

const gradeData = [
  { grade: 'Grade 7', rate: 4.2, color: '#10B981' },
  { grade: 'Grade 8', rate: 7.8, color: '#F59E0B' },
  { grade: 'Grade 9', rate: 12.3, color: '#EF4444' },
  { grade: 'Grade 10', rate: 8.9, color: '#F59E0B' },
];

const students = [
  { id: 1, name: 'Alex Rivera', grade: '9', absences: 18, pattern: [1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1,1] },
  { id: 2, name: 'Maya Thompson', grade: '9', absences: 15, pattern: [0,1,1,0,0,1,0,1,1,0,0,0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,0,1,0] },
  { id: 3, name: 'Jordan Lee', grade: '8', absences: 12, pattern: [1,0,0,1,1,0,0,0,1,0,1,0,0,1,0,0,1,1,0,0,0,1,0,0,1,0,1,1,0,0] },
  { id: 4, name: 'Sophie Chen', grade: '10', absences: 11, pattern: [0,0,1,0,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0] },
];

const getColor = (rate: number) => {
  if (rate <= 5) return '#10B981';
  if (rate <= 10) return '#F59E0B';
  return '#EF4444';
};

const ProgressRing = ({ grade, rate }: { grade: string; rate: number }) => {
  const data = [
    { value: rate, color: getColor(rate) },
    { value: 100 - rate, color: '#E5E7EB' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm flex flex-col items-center"
    >
      <div className="w-40 h-40 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{rate}%</span>
          <span className="text-xs text-gray-500">Absent</span>
        </div>
      </div>
      <p className="text-[15px] font-semibold text-gray-900 mt-4">{grade}</p>
    </motion.div>
  );
};

const TimelineBar = ({ pattern }: { pattern: number[] }) => (
  <div className="flex gap-0.5">
    {pattern.map((absent, i) => (
      <div
        key={i}
        className={`w-2 h-8 rounded-sm ${absent ? 'bg-red-400' : 'bg-emerald-400'}`}
      />
    ))}
  </div>
);

const IntegrationChronicAbsence = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Chronic Absenteeism</h1>
          <p className="text-[15px] text-gray-600 mt-1">Track and analyze patterns of chronic absenteeism across the school</p>
        </motion.div>

        {/* Progress Rings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {gradeData.map((item, index) => (
            <motion.div
              key={item.grade}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProgressRing grade={item.grade} rate={item.rate} />
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[15px] text-gray-600">0-5% (Healthy)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[15px] text-gray-600">5-10% (Warning)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[15px] text-gray-600">10%+ (Critical)</span>
          </div>
        </motion.div>

        {/* Student Timeline List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Student Absence Patterns</h2>
            <p className="text-sm text-gray-500 mt-1">Last 30 school days • Red = Absent</p>
          </div>
          <div className="divide-y divide-gray-100">
            {students.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{student.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">Grade {student.grade} • {student.absences} days</p>
                  </div>
                </div>
                <TimelineBar pattern={student.pattern} />
                <button className="text-xs font-medium bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors">
                  Flag for Support
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <FloatingDock 
        backPath="/pod/dashboard" 
        title="Absence Tracker"
        actionIcon={Flag}
        onAction={() => console.log('Flag all')}
      />
    </div>
  );
};

export default IntegrationChronicAbsence;
