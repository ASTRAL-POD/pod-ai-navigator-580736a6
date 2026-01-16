import { motion } from 'framer-motion';
import { 
  Brain, AlertTriangle, TrendingUp, Users, Zap, Clock,
  ChevronRight, MessageSquare, Shield, Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import GlassCard from '@/components/ui/GlassCard';
import BackButton from '@/components/navigation/BackButton';

const insights = [
  {
    id: 1,
    type: 'prediction',
    priority: 'high',
    title: 'Conflict Risk Detected',
    description: 'Grade 10-A shows 85% probability of interpersonal conflict based on recent chatting patterns and behavioral indicators.',
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
    description: '5 students from Grade 9-B have synchronized absences on Fridays for the past 3 weeks. Possible coordinated behavior.',
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
    description: 'Student Juan Dela Cruz (10-A) shows escalating pattern: 3 minor offenses in 2 weeks. Risk of major incident: 78%.',
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
    description: 'Analysis shows 67% of incidents occur between 9:30-10:30 AM. Consider increased monitoring during recess.',
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
    description: 'Peer mentoring program in Grade 11 has reduced repeat offenses by 45%. Recommend expansion to Grade 10.',
    confidence: 88,
    timeAgo: '2 days ago',
    action: 'Implement Program',
    icon: Target
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'medium': return 'bg-warning/10 text-warning border-warning/20';
    case 'low': return 'bg-success/10 text-success border-success/20';
    default: return 'bg-secondary text-muted-foreground border-border';
  }
};

const AiInsights = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <BackButton dashboardPath="/pod/dashboard" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-beadle/20 flex items-center justify-center">
              <Brain className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">AI Insights</h1>
              <p className="text-muted-foreground">Intelligence feed and early warning system</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <GlassCard className="p-4 text-center" glow="red">
              <p className="text-3xl font-bold text-destructive">3</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </GlassCard>
            <GlassCard className="p-4 text-center" glow="amber">
              <p className="text-3xl font-bold text-warning">5</p>
              <p className="text-sm text-muted-foreground">Active Predictions</p>
            </GlassCard>
            <GlassCard className="p-4 text-center" glow="green">
              <p className="text-3xl font-bold text-success">89%</p>
              <p className="text-sm text-muted-foreground">Model Accuracy</p>
            </GlassCard>
          </div>
        </motion.div>

        {/* Insight Feed */}
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6" glow={insight.priority === 'high' ? 'red' : insight.priority === 'medium' ? 'amber' : 'green'}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getPriorityColor(insight.priority)}`}>
                    <insight.icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs uppercase">
                        {insight.type}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(insight.priority)}`}>
                        {insight.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-auto">{insight.timeAgo}</span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {insight.description}
                    </p>

                    {/* Confidence Bar */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">AI Confidence</span>
                          <span className="text-xs font-medium">{insight.confidence}%</span>
                        </div>
                        <Progress value={insight.confidence} className="h-1.5" />
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="gap-2" size="sm">
                      <Zap className="h-4 w-4" />
                      {insight.action}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
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
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <GlassCard className="p-4 flex items-center justify-between" hover={false}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm text-muted-foreground">AI Model Active</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Last updated: 2 min ago</span>
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
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
