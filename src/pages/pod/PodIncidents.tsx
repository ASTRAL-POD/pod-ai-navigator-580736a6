import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, User, ChevronRight, X, CheckSquare } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const mockIncidents = [
  { id: 1, time: '10:45 AM', reporter: 'Beadle - 10A', description: 'Fighting near cafeteria', severity: 'high', status: 'new' },
  { id: 2, time: '09:30 AM', reporter: 'Teacher Santos', description: 'Cheating during exam', severity: 'medium', status: 'new' },
  { id: 3, time: '08:15 AM', reporter: 'Beadle - 9B', description: 'Late arrival (3rd time)', severity: 'low', status: 'reviewed' },
  { id: 4, time: 'Yesterday', reporter: 'Beadle - 11C', description: 'Vandalism in restroom', severity: 'high', status: 'new' },
  { id: 5, time: 'Yesterday', reporter: 'Guard Office', description: 'Unauthorized exit', severity: 'medium', status: 'reviewed' },
];

const severityColors = {
  high: 'bg-destructive',
  medium: 'bg-amber-500',
  low: 'bg-green-500',
};

const PodIncidents = () => {
  const [selectedIncident, setSelectedIncident] = useState<typeof mockIncidents[0] | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <BackButton dashboardPath="/pod/dashboard" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-3 rounded-xl bg-destructive/10">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            Incident Queue
          </h1>
          <p className="text-muted-foreground mt-2">Triage and process incoming incident reports</p>
        </motion.div>

        <div className="flex gap-4 mb-4">
          <Badge variant="outline" className="gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            {mockIncidents.filter(i => i.status === 'new').length} New
          </Badge>
          <Badge variant="outline">{mockIncidents.length} Total</Badge>
        </div>

        <GlassCard className="divide-y divide-border/50">
          {mockIncidents.map((incident) => (
            <motion.div
              key={incident.id}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
              className="flex items-center gap-4 p-4 cursor-pointer"
              onClick={() => setSelectedIncident(incident)}
            >
              <Checkbox
                checked={selected.includes(incident.id)}
                onCheckedChange={(checked) => {
                  setSelected(checked ? [...selected, incident.id] : selected.filter(id => id !== incident.id));
                }}
                onClick={(e) => e.stopPropagation()}
              />
              <div className={`w-3 h-3 rounded-full ${severityColors[incident.severity]}`} />
              <div className="flex items-center gap-2 text-sm text-muted-foreground min-w-[80px]">
                <Clock className="w-4 h-4" />
                {incident.time}
              </div>
              <div className="flex items-center gap-2 text-sm min-w-[140px]">
                <User className="w-4 h-4 text-muted-foreground" />
                {incident.reporter}
              </div>
              <p className="flex-1 text-sm truncate">{incident.description}</p>
              {incident.status === 'new' && <Badge variant="destructive" className="text-xs">New</Badge>}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          ))}
        </GlassCard>

        {/* Quick Preview Drawer */}
        <AnimatePresence>
          {selectedIncident && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background/95 backdrop-blur-xl border-l shadow-2xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Quick Preview</h3>
                <Button variant="ghost" size="icon" onClick={() => setSelectedIncident(null)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${severityColors[selectedIncident.severity]} text-white`}>
                  {selectedIncident.severity.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reporter</p>
                  <p className="font-medium">{selectedIncident.reporter}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedIncident.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium">{selectedIncident.description}</p>
                </div>
                <Button className="w-full mt-6 gap-2">
                  <CheckSquare className="w-4 h-4" /> Create Case
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PodIncidents;
