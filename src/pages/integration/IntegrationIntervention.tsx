import { motion } from 'framer-motion';
import { Plus, ClipboardList, Activity, Eye, Archive } from 'lucide-react';
import FloatingDock from '@/components/ui/FloatingDock';

interface PlanCard {
  id: number;
  studentName: string;
  studentAvatar: string;
  planName: string;
  progress: number;
  health: 'green' | 'amber' | 'red';
  lastUpdate: string;
}

const columns = [
  {
    id: 'diagnostic',
    title: 'Diagnostic',
    icon: ClipboardList,
    cards: [
      { id: 1, studentName: 'Marcus Chen', studentAvatar: 'MC', planName: 'Academic Support Assessment', progress: 25, health: 'amber' as const, lastUpdate: '2 days ago' },
      { id: 2, studentName: 'Sarah Williams', studentAvatar: 'SW', planName: 'Behavioral Evaluation', progress: 40, health: 'red' as const, lastUpdate: '1 day ago' },
    ]
  },
  {
    id: 'active',
    title: 'Active Support',
    icon: Activity,
    cards: [
      { id: 3, studentName: 'David Park', studentAvatar: 'DP', planName: 'Mentorship Program', progress: 60, health: 'green' as const, lastUpdate: '3 hours ago' },
      { id: 4, studentName: 'Emily Torres', studentAvatar: 'ET', planName: 'Peer Mediation', progress: 45, health: 'amber' as const, lastUpdate: '1 day ago' },
      { id: 5, studentName: 'James Liu', studentAvatar: 'JL', planName: 'Counseling Sessions', progress: 70, health: 'green' as const, lastUpdate: '6 hours ago' },
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    icon: Eye,
    cards: [
      { id: 6, studentName: 'Anna Kim', studentAvatar: 'AK', planName: 'Post-Intervention Check', progress: 85, health: 'green' as const, lastUpdate: '2 days ago' },
      { id: 7, studentName: 'Ryan Johnson', studentAvatar: 'RJ', planName: 'Follow-up Assessment', progress: 90, health: 'green' as const, lastUpdate: '5 days ago' },
    ]
  },
  {
    id: 'archive',
    title: 'Archive',
    icon: Archive,
    cards: [
      { id: 8, studentName: 'Lisa Chen', studentAvatar: 'LC', planName: 'Completed - Success', progress: 100, health: 'green' as const, lastUpdate: '2 weeks ago' },
    ]
  },
];

const PlanCardComponent = ({ card, index }: { card: PlanCard; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 + index * 0.1 }}
    className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-sm border border-white/40 hover:shadow-md transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-600">{card.studentAvatar}</span>
      </div>
      <div className={`w-3 h-3 rounded-full ${
        card.health === 'green' ? 'bg-emerald-500' :
        card.health === 'amber' ? 'bg-amber-500' :
        'bg-red-500'
      }`} />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.planName}</h3>
    <p className="text-[15px] text-gray-600 mb-4">{card.studentName}</p>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Progress</span>
        <span className="font-medium text-gray-900">{card.progress}%</span>
      </div>
      <div className="bg-gray-200 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${card.progress}%` }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-blue-600 h-2 rounded-full"
        />
      </div>
    </div>
    <p className="text-xs text-gray-400 mt-4">Updated {card.lastUpdate}</p>
  </motion.div>
);

const IntegrationIntervention = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Intervention Tracking</h1>
          <p className="text-[15px] text-gray-600 mt-1">Monitor the effectiveness of intervention programs and strategies</p>
        </motion.div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column, colIndex) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: colIndex * 0.1 }}
              className="flex-1 min-w-[280px] bg-gray-100/80 rounded-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-4 px-2">
                <column.icon className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
                <h2 className="text-[15px] font-semibold text-gray-900">{column.title}</h2>
                <span className="ml-auto text-xs font-medium bg-white px-2 py-0.5 rounded-full text-gray-600">
                  {column.cards.length}
                </span>
              </div>
              <div className="space-y-3">
                {column.cards.map((card, cardIndex) => (
                  <PlanCardComponent key={card.id} card={card} index={cardIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Active Plans', value: '23', trend: '+3 this week' },
            { label: 'Avg. Success Rate', value: '78%', trend: '↑ 5% from last month' },
            { label: 'Plans At Risk', value: '4', trend: 'Requires attention' },
            { label: 'Completed This Month', value: '12', trend: 'On track' },
          ].map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl border border-white/40 shadow-sm">
              <p className="text-xs font-medium tracking-widest text-gray-500 uppercase mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-[15px] text-gray-600 mt-1">{stat.trend}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <FloatingDock 
        backPath="/pod/dashboard" 
        title="Plan Manager"
        actionIcon={Plus}
        onAction={() => console.log('New plan')}
      />
    </div>
  );
};

export default IntegrationIntervention;
