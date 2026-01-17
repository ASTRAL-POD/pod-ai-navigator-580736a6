import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';
import FloatingDock from '@/components/ui/FloatingDock';

const correlationData = [
  { month: 'Sep', attendance: 94, incidents: 12 },
  { month: 'Oct', attendance: 91, incidents: 18 },
  { month: 'Nov', attendance: 88, incidents: 24 },
  { month: 'Dec', attendance: 85, incidents: 31 },
  { month: 'Jan', attendance: 82, incidents: 38 },
];

const sparklineData = [
  { value: 65 }, { value: 72 }, { value: 68 }, { value: 75 }, { value: 82 }, { value: 78 }, { value: 85 },
];

const atRiskStudents = [
  { id: 1, name: 'Marcus Chen', grade: '10', attendance: '72%', incidents: 8, risk: 'critical' },
  { id: 2, name: 'Sarah Williams', grade: '9', attendance: '78%', incidents: 6, risk: 'critical' },
  { id: 3, name: 'David Park', grade: '11', attendance: '81%', incidents: 5, risk: 'high' },
  { id: 4, name: 'Emily Torres', grade: '10', attendance: '83%', incidents: 4, risk: 'high' },
  { id: 5, name: 'James Liu', grade: '9', attendance: '85%', incidents: 3, risk: 'moderate' },
];

const KPICard = ({ title, value, subtitle, trend }: { title: string; value: string; subtitle: string; trend: 'up' | 'down' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm"
  >
    <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">{title}</p>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-[15px] text-gray-600 mb-4">{subtitle}</p>
    <div className="h-12">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparklineData}>
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fill="url(#gradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

const IntegrationAttendanceBehavior = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Attendance-Behavior Correlation</h1>
          <p className="text-[15px] text-gray-600 mt-1">Analyze the relationship between attendance patterns and behavioral incidents</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard title="Correlation Index" value="0.78" subtitle="Strong negative correlation" trend="up" />
          <KPICard title="Risk Nodes" value="23" subtitle="Students requiring intervention" trend="down" />
          <KPICard title="Success Rate" value="67%" subtitle="Interventions effective" trend="up" />
        </div>

        {/* Dual-Axis Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Attendance vs Incidents Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={correlationData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis yAxisId="left" orientation="left" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} domain={[70, 100]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} domain={[0, 50]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.9)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line yAxisId="left" type="monotone" dataKey="attendance" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', strokeWidth: 2 }} name="Attendance %" />
                <Line yAxisId="right" type="monotone" dataKey="incidents" stroke="#EF4444" strokeWidth={2} dot={{ fill: '#EF4444', strokeWidth: 2 }} name="Incident Count" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[15px] text-gray-600">Attendance %</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-[15px] text-gray-600">Incident Count</span>
            </div>
          </div>
        </motion.div>

        {/* At-Risk Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/40 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">At-Risk Students</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {atRiskStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-6 flex items-center justify-between ${student.risk === 'critical' ? 'bg-red-50 border-l-4 border-red-500' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{student.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">Grade {student.grade}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[15px] font-semibold text-gray-900">{student.attendance}</p>
                    <p className="text-xs text-gray-500">Attendance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[15px] font-semibold text-red-600">{student.incidents}</p>
                    <p className="text-xs text-gray-500">Incidents</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    student.risk === 'critical' ? 'bg-red-100 text-red-700' :
                    student.risk === 'high' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {student.risk.charAt(0).toUpperCase() + student.risk.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <FloatingDock 
        backPath="/pod/dashboard" 
        title="Correlation Engine"
        actionIcon={Download}
        onAction={() => console.log('Export data')}
      />
    </div>
  );
};

export default IntegrationAttendanceBehavior;
