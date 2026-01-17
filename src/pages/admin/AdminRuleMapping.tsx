import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, ChevronRight } from 'lucide-react';
import AdminFloatingNav from '@/components/ui/AdminFloatingNav';

interface Rule {
  id: number;
  name: string;
  condition: string;
  action: string;
  active: boolean;
  severity: 'minor' | 'moderate' | 'major';
}

const rules: Rule[] = [
  { id: 1, name: 'Late Arrival Policy', condition: '3+ tardies in 5 days', action: 'Parent notification + detention', active: true, severity: 'minor' },
  { id: 2, name: 'Uniform Violation', condition: 'Repeated dress code breach', action: 'Warning letter + counselor referral', active: true, severity: 'minor' },
  { id: 3, name: 'Academic Integrity', condition: 'Confirmed cheating incident', action: 'Zero grade + parent conference', active: true, severity: 'major' },
  { id: 4, name: 'Physical Altercation', condition: 'Fighting on school premises', action: 'Immediate suspension + investigation', active: true, severity: 'major' },
  { id: 5, name: 'Device Misuse', condition: 'Unauthorized phone use', action: 'Device confiscation + detention', active: false, severity: 'moderate' },
  { id: 6, name: 'Bullying Report', condition: 'Verified bullying behavior', action: 'Counseling + behavior contract', active: true, severity: 'major' },
];

const AdminRuleMapping = () => {
  const [expandedRule, setExpandedRule] = useState<number | null>(1);
  const [ruleStates, setRuleStates] = useState<Record<number, boolean>>(
    Object.fromEntries(rules.map(r => [r.id, r.active]))
  );

  const toggleRule = (id: number) => {
    setRuleStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Rule Mapping</h1>
          <p className="text-[15px] text-gray-600 mt-1">Map disciplinary rules to offenses and recommended sanctions</p>
        </motion.div>

        {/* Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rule List (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Configured Rules</h2>
            {rules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-sm"
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
                >
                  <div className="flex items-center gap-3">
                    {expandedRule === rule.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                    )}
                    <div>
                      <p className="text-[15px] font-medium text-gray-900">{rule.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        rule.severity === 'major' ? 'bg-red-100 text-red-700' :
                        rule.severity === 'moderate' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {rule.severity.charAt(0).toUpperCase() + rule.severity.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRule(rule.id);
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      ruleStates[rule.id] ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <motion.div
                      animate={{ x: ruleStates[rule.id] ? 24 : 2 }}
                      className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5"
                    />
                  </button>
                </div>
                
                {expandedRule === rule.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Condition</p>
                        <p className="text-[15px] text-gray-700">{rule.condition}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Action</p>
                        <p className="text-[15px] text-gray-700">{rule.action}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Action View (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Logic Flow</h2>
            
            {expandedRule && (
              <motion.div
                key={expandedRule}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-sm"
              >
                {(() => {
                  const rule = rules.find(r => r.id === expandedRule);
                  if (!rule) return null;
                  
                  return (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-900">{rule.name}</h3>
                        <p className={`text-sm mt-1 ${ruleStates[rule.id] ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {ruleStates[rule.id] ? '● Active' : '○ Inactive'}
                        </p>
                      </div>
                      
                      {/* Visual Flow */}
                      <div className="relative py-8">
                        {/* Condition Box */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-4">
                          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-2">IF</p>
                          <p className="text-[15px] font-medium text-gray-900">{rule.condition}</p>
                        </div>
                        
                        {/* Animated Line */}
                        <div className="flex justify-center">
                          <svg width="2" height="40" className="overflow-visible">
                            <motion.line
                              x1="1"
                              y1="0"
                              x2="1"
                              y2="40"
                              stroke="#2563EB"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            />
                            <motion.polygon
                              points="1,40 -4,32 6,32"
                              fill="#2563EB"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                            />
                          </svg>
                        </div>
                        
                        {/* Action Box */}
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 mt-4">
                          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-2">THEN</p>
                          <p className="text-[15px] font-medium text-gray-900">{rule.action}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
            
            {!expandedRule && (
              <div className="bg-white/50 backdrop-blur-xl p-8 rounded-3xl border border-white/40 flex items-center justify-center h-80">
                <p className="text-[15px] text-gray-500">Select a rule to view its logic flow</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <AdminFloatingNav />
    </div>
  );
};

export default AdminRuleMapping;
