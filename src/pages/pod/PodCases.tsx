import { useState, DragEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, GripVertical, Clock, User, AlertTriangle, CheckCircle,
  Search, Filter, Plus, MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/ui/GlassCard';
import BackButton from '@/components/navigation/BackButton';

type CaseStatus = 'reported' | 'investigating' | 'hearing' | 'pending' | 'resolved';

interface Case {
  id: string;
  student: string;
  avatar: string;
  offense: string;
  severity: 'Minor' | 'Major';
  daysElapsed: number;
  status: CaseStatus;
}

const initialCases: Case[] = [
  { id: '1', student: 'Juan Dela Cruz', avatar: 'JD', offense: 'Bullying', severity: 'Major', daysElapsed: 2, status: 'reported' },
  { id: '2', student: 'Maria Santos', avatar: 'MS', offense: 'Vandalism', severity: 'Major', daysElapsed: 5, status: 'investigating' },
  { id: '3', student: 'Pedro Reyes', avatar: 'PR', offense: 'Tardiness', severity: 'Minor', daysElapsed: 1, status: 'reported' },
  { id: '4', student: 'Ana Gonzales', avatar: 'AG', offense: 'Fighting', severity: 'Major', daysElapsed: 7, status: 'hearing' },
  { id: '5', student: 'Carlos Mendoza', avatar: 'CM', offense: 'Cheating', severity: 'Major', daysElapsed: 3, status: 'pending' },
  { id: '6', student: 'Lucia Rivera', avatar: 'LR', offense: 'Absence', severity: 'Minor', daysElapsed: 10, status: 'resolved' },
];

const columns: { id: CaseStatus; title: string; color: string }[] = [
  { id: 'reported', title: 'Reported', color: 'bg-secondary' },
  { id: 'investigating', title: 'Investigating', color: 'bg-primary/10' },
  { id: 'hearing', title: 'Hearing Scheduled', color: 'bg-warning/10' },
  { id: 'pending', title: 'Decision Pending', color: 'bg-destructive/10' },
  { id: 'resolved', title: 'Resolved', color: 'bg-success/10' },
];

const PodCases = () => {
  const [cases, setCases] = useState(initialCases);
  const [draggedCase, setDraggedCase] = useState<Case | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<CaseStatus | null>(null);

  const handleDragStart = (e: DragEvent, caseItem: Case) => {
    setDraggedCase(caseItem);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: DragEvent, columnId: CaseStatus) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: DragEvent, columnId: CaseStatus) => {
    e.preventDefault();
    if (draggedCase) {
      setCases(cases.map(c => 
        c.id === draggedCase.id ? { ...c, status: columnId } : c
      ));
    }
    setDraggedCase(null);
    setDragOverColumn(null);
  };

  const getCasesByStatus = (status: CaseStatus) => cases.filter(c => c.status === status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-full mx-auto">
        <BackButton dashboardPath="/pod/dashboard" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
                <FolderOpen className="h-10 w-10 text-primary" />
                Active Cases
              </h1>
              <p className="text-muted-foreground">Drag and drop to update case status</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search cases..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Case
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column, colIndex) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: colIndex * 0.1 }}
              className="flex-shrink-0 w-72"
            >
              <GlassCard 
                className={`p-4 min-h-[600px] transition-all duration-200 ${
                  dragOverColumn === column.id ? 'ring-2 ring-primary scale-[1.02]' : ''
                }`}
                hover={false}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className={`flex items-center justify-between mb-4 p-3 rounded-xl ${column.color}`}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{column.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {getCasesByStatus(column.id).length}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Case Cards */}
                <div className="space-y-3">
                  {getCasesByStatus(column.id).map((caseItem, index) => (
                    <motion.div
                      key={caseItem.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e as any, caseItem)}
                      className={`p-4 bg-white/80 rounded-xl border border-white/50 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${
                        draggedCase?.id === caseItem.id ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                            {caseItem.avatar}
                          </div>
                        </div>
                        <Badge variant={caseItem.severity === 'Major' ? 'destructive' : 'secondary'} className="text-xs">
                          {caseItem.severity}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{caseItem.student}</h4>
                      <p className="text-xs text-destructive font-medium mb-3">{caseItem.offense}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{caseItem.daysElapsed}d ago</span>
                        </div>
                        {caseItem.status === 'resolved' && (
                          <CheckCircle className="h-4 w-4 text-success" />
                        )}
                        {caseItem.daysElapsed > 5 && caseItem.status !== 'resolved' && (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {getCasesByStatus(column.id).length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                    <p className="text-sm">No cases</p>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PodCases;
