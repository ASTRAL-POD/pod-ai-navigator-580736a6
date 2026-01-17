import { motion } from 'framer-motion';
import { 
  LineChart as LineChartIcon, AlertTriangle,
  Users, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import BackButton from '@/components/navigation/BackButton';

const trendData = [
  { month: 'Aug', incidents: 45, resolved: 40 },
  { month: 'Sep', incidents: 52, resolved: 48 },
  { month: 'Oct', incidents: 38, resolved: 35 },
  { month: 'Nov', incidents: 65, resolved: 55 },
  { month: 'Dec', incidents: 42, resolved: 40 },
  { month: 'Jan', incidents: 58, resolved: 50 },
];

const sectionHeatmap = [
  { section: '7-A', level: 1 }, { section: '7-B', level: 2 }, { section: '7-C', level: 1 },
  { section: '8-A', level: 3 }, { section: '8-B', level: 1 }, { section: '8-C', level: 2 },
  { section: '9-A', level: 4 }, { section: '9-B', level: 2 }, { section: '9-C', level: 1 },
  { section: '10-A', level: 5 }, { section: '10-B', level: 3 }, { section: '10-C', level: 2 },
  { section: '11-A', level: 2 }, { section: '11-B', level: 1 }, { section: '11-C', level: 3 },
  { section: '12-A', level: 1 }, { section: '12-B', level: 2 }, { section: '12-C', level: 1 },
];

const getHeatColor = (level: number) => {
  switch (level) {
    case 1: return 'bg-white/10 text-white/60';
    case 2: return 'bg-white/15 text-white/70';
    case 3: return 'bg-white/20 text-white/80';
    case 4: return 'bg-white/25 text-white/85';
    case 5: return 'bg-white/30 text-white/90';
    default: return 'bg-white/5 text-white/40';
  }
};

const AiTrends = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex items-center justify-center">
      <div className="w-[70vw] max-w-6xl mx-auto h-full flex flex-col py-6 pb-[10vh]">
        <BackButton dashboardPath="/pod/dashboard" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <LineChartIcon className="h-6 w-6 text-white/70" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white/95">Trend Analytics</h1>
              <p className="text-xs text-white/50">Data storytelling for insights</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <GlassCard className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/50 mb-1">Total Incidents Today</p>
                <h3 className="text-2xl font-bold text-white/90">12</h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-green-400">
                  <ArrowDownRight className="h-3 w-3" />
                  <span>18% less</span>
                </div>
              </div>
              <AlertTriangle className="h-5 w-5 text-white/40" />
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/50 mb-1">Most Common</p>
                <h3 className="text-lg font-bold text-white/90">Tardiness</h3>
                <p className="text-xs text-white/40 mt-1">42% of incidents</p>
              </div>
              <Calendar className="h-5 w-5 text-white/40" />
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-white/50 mb-1">High Risk Sections</p>
                <h3 className="text-2xl font-bold text-white/90">3</h3>
                <div className="flex items-center gap-1 mt-1 text-xs text-red-400">
                  <ArrowUpRight className="h-3 w-3" />
                  <span>+1 this week</span>
                </div>
              </div>
              <Users className="h-5 w-5 text-white/40" />
            </div>
          </GlassCard>
        </div>

        {/* Main Chart */}
        <GlassCard className="p-4 mb-4 flex-1" hover={false}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-medium text-white/80">Semester Trends</h2>
              <p className="text-xs text-white/40">Incidents vs Resolutions</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <span className="text-white/50">Incidents</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-white/30" />
                <span className="text-white/50">Resolved</span>
              </div>
            </div>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(255,255,255,0.3)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="rgba(255,255,255,0)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="rgba(255,255,255,0.6)" 
                  strokeWidth={2}
                  fill="url(#incidentGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth={2}
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Section Heatmap */}
        <GlassCard className="p-4" hover={false}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-medium text-white/80">Section Heatmap</h2>
              <p className="text-xs text-white/40">Incident frequency by classroom</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/40">
              <span>Low</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(level => (
                  <div key={level} className={`w-4 h-4 rounded ${getHeatColor(level)}`} />
                ))}
              </div>
              <span>High</span>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {sectionHeatmap.map((section, index) => (
              <motion.div
                key={section.section}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05 }}
                className={`p-2 rounded-lg text-center cursor-pointer transition-all ${getHeatColor(section.level)}`}
              >
                <p className="font-medium text-xs">{section.section}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AiTrends;
