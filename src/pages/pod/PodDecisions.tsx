import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gavel, CheckCircle, XCircle, Edit, Video, FileText, Brain } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const mockPendingCases = [
  { id: 1, name: 'Juan Dela Cruz', grade: '10-A', offense: 'Bullying', severity: 'Major', confidence: 98, evidence: 3 },
  { id: 2, name: 'Maria Santos', grade: '9-B', offense: 'Cheating', severity: 'Minor', confidence: 85, evidence: 2 },
  { id: 3, name: 'Pedro Reyes', grade: '11-C', offense: 'Vandalism', severity: 'Major', confidence: 92, evidence: 5 },
];

const PodDecisions = () => {
  const [selectedCase, setSelectedCase] = useState(mockPendingCases[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <BackButton dashboardPath="/pod/dashboard" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10">
              <Gavel className="w-8 h-8 text-amber-500" />
            </div>
            Decisions Panel
          </h1>
          <p className="text-muted-foreground mt-2">Final judgment and sanction application</p>
        </motion.div>

        {/* Horizontal Scroll Cases */}
        <ScrollArea className="w-full whitespace-nowrap mb-6">
          <div className="flex gap-4 pb-4">
            {mockPendingCases.map((case_) => (
              <GlassCard
                key={case_.id}
                onClick={() => setSelectedCase(case_)}
                className={`p-4 min-w-[280px] cursor-pointer transition-all ${selectedCase.id === case_.id ? 'ring-2 ring-primary' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold">
                    {case_.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold">{case_.name}</p>
                    <p className="text-sm text-muted-foreground">{case_.grade}</p>
                  </div>
                </div>
                <Badge variant={case_.severity === 'Major' ? 'destructive' : 'secondary'}>{case_.offense}</Badge>
              </GlassCard>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Evidence */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-primary" /> Key Evidence
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center">
                  <Video className="w-8 h-8 text-muted-foreground" />
                </div>
              ))}
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Report Summary
              </h4>
              <p className="text-sm text-muted-foreground">
                Student was reported for {selectedCase.offense.toLowerCase()} on January 15, 2026.
                Multiple witnesses confirm the incident. Evidence includes CCTV footage and written statements.
              </p>
            </div>
          </GlassCard>

          {/* Right: AI Recommendation */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" /> AI Recommendation
            </h3>
            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-primary/10 rounded-xl mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Confidence Score</span>
                <span className="text-2xl font-bold text-primary">{selectedCase.confidence}%</span>
              </div>
              <div className="w-full bg-secondary/50 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${selectedCase.confidence}%` }} />
              </div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-lg mb-6">
              <p className="text-sm font-medium mb-2">Recommended Sanction:</p>
              <p className="text-lg font-semibold text-amber-500">3-Day Suspension + Community Service</p>
            </div>
            <div className="flex flex-col gap-3">
              <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                <CheckCircle className="w-4 h-4" /> Approve Sanction
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Edit className="w-4 h-4" /> Override & Modify
              </Button>
              <Button variant="ghost" className="w-full gap-2 text-muted-foreground">
                <XCircle className="w-4 h-4" /> Dismiss Case
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default PodDecisions;
