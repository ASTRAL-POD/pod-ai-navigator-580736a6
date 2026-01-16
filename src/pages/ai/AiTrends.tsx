import { motion } from 'framer-motion';
import { 
  LineChart as LineChartIcon, TrendingUp, TrendingDown, AlertTriangle,
  Users, Calendar, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell
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
    case 1: return 'bg-success/20 text-success border-success/30';
    case 2: return 'bg-success/40 text-success border-success/50';
    case 3: return 'bg-warning/40 text-warning border-warning/50';
    case 4: return 'bg-warning/60 text-warning border-warning/70';
    case 5: return 'bg-destructive/50 text-destructive border-destructive/60';
    default: return 'bg-secondary text-muted-foreground border-border';
  }
};

const AiTrends = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <BackButton dashboardPath="/pod/dashboard" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <LineChartIcon className="h-10 w-10 text-primary" />
            Trend Analytics
          </h1>
          <p className="text-muted-foreground">Data storytelling for behavioral insights</p>
        </motion.div>

        {/* Hero Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <GlassCard className="p-6" glow="blue">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Incidents Today</p>
                <h3 className="text-4xl font-bold text-foreground">12</h3>
                <div className="flex items-center gap-1 mt-2 text-sm text-success">
                  <ArrowDownRight className="h-4 w-4" />
                  <span>18% less than yesterday</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6" glow="amber">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Most Common Offense</p>
                <h3 className="text-2xl font-bold text-foreground">Tardiness</h3>
                <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                  <span>42% of all incidents</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6" glow="red">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">High Risk Sections</p>
                <h3 className="text-4xl font-bold text-foreground">3</h3>
                <div className="flex items-center gap-1 mt-2 text-sm text-destructive">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>1 more than last week</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-destructive/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Chart */}
        <GlassCard className="p-6 mb-8" hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Semester Incident Trends</h2>
              <p className="text-sm text-muted-foreground">Monthly comparison of incidents vs resolutions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">Incidents</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm">Resolved</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="incidentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(160, 84%, 39%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="month" stroke="hsl(220, 9%, 46%)" />
                <YAxis stroke="hsl(220, 9%, 46%)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(0, 0%, 100%)', 
                    border: '1px solid hsl(220, 13%, 91%)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="hsl(217, 91%, 60%)" 
                  strokeWidth={3}
                  fill="url(#incidentGradient)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="hsl(160, 84%, 39%)" 
                  strokeWidth={3}
                  fill="url(#resolvedGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Section Heatmap */}
        <GlassCard className="p-6" hover={false}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">Section Heatmap</h2>
              <p className="text-sm text-muted-foreground">Incident frequency by classroom</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Low</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(level => (
                  <div key={level} className={`w-6 h-6 rounded ${getHeatColor(level)}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {sectionHeatmap.map((section, index) => (
              <motion.div
                key={section.section}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${getHeatColor(section.level)}`}
              >
                <p className="font-semibold">{section.section}</p>
                <p className="text-xs opacity-75">{section.level} alerts</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AiTrends;
