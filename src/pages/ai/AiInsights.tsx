import { motion } from 'framer-motion';
import { 
  Brain, AlertTriangle, TrendingUp, Users, Zap, Clock,
  ChevronRight, MessageSquare, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import GlassCard from '@/components/layout/GlassCard';
import BackButton from '@/components/navigation/BackButton';

const insights = [
  {
    id: 1,
    type: 'prediction',
    priority: 'high',
    title: 'Conflict Risk Detected',
    description: 'Grade 10-A shows 85% probability of interpersonal conflict based on recent chatting patterns.',
    confidence: 85,
    timeAgo: '2 hours ago',
    action: 'Preventative Intervention',
    icon: AlertTriangle
  },
  {
    id: 2,
    type: 'pattern',
    priority: 'medium',
    title: 'Attendance Anomaly',
    description: '5 students from Grade 9-B have synchronized absences on Fridays for 3 weeks.',
    confidence: 72,
    timeAgo: '4 hours ago',
    action: 'Investigate Pattern',
    icon: TrendingUp
  },
  {
    id: 3,
    type: 'early-warning',
    priority: 'high',
    title: 'Behavioral Escalation',
    description: 'Student Juan Dela Cruz (10-A) shows escalating pattern: 3 minor offenses in 2 weeks.',
    confidence: 78,
    timeAgo: '5 hours ago',
    action: 'Guidance Referral',
    icon: Users
  },
  {
    id: 4,
    type: 'insight',
    priority: 'low',
    title: 'Peak Incident Hours',
    description: '67% of incidents occur between 9:30-10:30 AM. Consider increased monitoring.',
    confidence: 92,
    timeAgo: '1 day ago',
    action: 'View Analysis',
    icon: Clock
  },
  {
    id: 5,
    type: 'recommendation',
    priority: 'medium',
    title: 'Intervention Success',
    description: 'Peer mentoring in Grade 11 reduced repeat offenses by 45%. Recommend expansion.',
    confidence: 88,
    timeAgo: '2 days ago',
    action: 'Implement Program',
    icon: Target
  },
];

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-400/20 text-red-400';
    case 'medium': return 'bg-yellow-400/20 text-yellow-400';
    case 'low': return 'bg-green-400/20 text-green-400';
    default: return 'bg-white/10 text-white/60';
  }
};

const AiInsights = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex items-center justify-center">
      <div className="w-[70vw] max-w-4xl mx-auto h-full flex flex-col py-6 pb-[10vh]">
        <BackButton dashboardPath="/pod/dashboard" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Brain className="h-5 w-5 text-white/70" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white/95">AI Insights</h1>
              <p className="text-xs text-white/50">Intelligence feed and early warnings</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-panel rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-red-400">3</p>
              <p className="text-xs text-white/50">High Priority</p>
            </div>
            <div className="glass-panel rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-yellow-400">5</p>
              <p className="text-xs text-white/50">Active Predictions</p>
            </div>
            <div className="glass-panel rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-green-400">89%</p>
              <p className="text-xs text-white/50">Model Accuracy</p>
            </div>
          </div>
        </motion.div>

        {/* Insight Feed */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getPriorityStyle(insight.priority)}`}>
                    <insight.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs uppercase bg-white/10 text-white/60">
                        {insight.type}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getPriorityStyle(insight.priority)}`}>
                        {insight.priority}
                      </Badge>
                      <span className="text-xs text-white/40 ml-auto">{insight.timeAgo}</span>
                    </div>

                    <h3 className="font-medium text-white/90 mb-1">{insight.title}</h3>
                    <p className="text-sm text-white/50 mb-3">{insight.description}</p>

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-white/40">Confidence</span>
                          <span className="text-xs font-medium text-white/60">{insight.confidence}%</span>
                        </div>
                        <Progress value={insight.confidence} className="h-1" />
                      </div>
                      <Button size="sm" className="gap-1 bg-white/10 hover:bg-white/15 text-white/80">
                        <Zap className="h-3 w-3" />
                        {insight.action}
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* AI Status Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <GlassCard className="p-3 flex items-center justify-between" hover={false}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/50">AI Model Active</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/40">
              <span>Updated 2 min ago</span>
              <Button variant="ghost" size="sm" className="gap-1 text-white/50 hover:text-white/70">
                <MessageSquare className="h-3 w-3" />
                Feedback
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default AiInsights;
