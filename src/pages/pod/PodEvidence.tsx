import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Image, Lock, Video, FileText, Upload, Filter, Search, Grid, List,
  Clock, User, Download, Eye, MoreVertical, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui/GlassCard';
import BackButton from '@/components/navigation/BackButton';

const evidenceItems = [
  { 
    id: 1, 
    type: 'video', 
    name: 'CCTV_Canteen_01152024.mp4', 
    case: 'Case #2024-015',
    uploadedBy: 'Beadle - 10-A',
    uploadedAt: '10:45 AM',
    size: '24.5 MB',
    status: 'verified'
  },
  { 
    id: 2, 
    type: 'image', 
    name: 'vandalism_photo_01.jpg', 
    case: 'Case #2024-012',
    uploadedBy: 'Guard - Gate 1',
    uploadedAt: '09:30 AM',
    size: '2.1 MB',
    status: 'pending'
  },
  { 
    id: 3, 
    type: 'image', 
    name: 'incident_evidence_02.jpg', 
    case: 'Case #2024-015',
    uploadedBy: 'Teacher - Ms. Garcia',
    uploadedAt: '09:15 AM',
    size: '1.8 MB',
    status: 'verified'
  },
  { 
    id: 4, 
    type: 'document', 
    name: 'witness_statement.pdf', 
    case: 'Case #2024-010',
    uploadedBy: 'POD Office',
    uploadedAt: 'Yesterday',
    size: '156 KB',
    status: 'verified'
  },
  { 
    id: 5, 
    type: 'video', 
    name: 'hallway_incident.mp4', 
    case: 'Case #2024-008',
    uploadedBy: 'Security',
    uploadedAt: 'Jan 14',
    size: '45.2 MB',
    status: 'verified'
  },
  { 
    id: 6, 
    type: 'image', 
    name: 'contraband_photo.jpg', 
    case: 'Case #2024-007',
    uploadedBy: 'Guard - Gate 2',
    uploadedAt: 'Jan 13',
    size: '3.2 MB',
    status: 'archived'
  },
];

const custodyLog = [
  { action: 'Verified', user: 'POD - Mr. Santos', time: '11:00 AM', date: 'Today' },
  { action: 'Viewed', user: 'Adviser - Ms. Cruz', time: '10:50 AM', date: 'Today' },
  { action: 'Uploaded', user: 'Beadle - 10-A', time: '10:45 AM', date: 'Today' },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'video': return Video;
    case 'image': return Image;
    case 'document': return FileText;
    default: return FileText;
  }
};

const PodEvidence = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<typeof evidenceItems[0] | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <BackButton dashboardPath="/pod/dashboard" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">Evidence Vault</h1>
                <p className="text-muted-foreground">Secure storage for case evidence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search evidence..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'grid' | 'list')}>
                <TabsList>
                  <TabsTrigger value="grid"><Grid className="h-4 w-4" /></TabsTrigger>
                  <TabsTrigger value="list"><List className="h-4 w-4" /></TabsTrigger>
                </TabsList>
              </Tabs>
              <Button className="gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {evidenceItems.map((item, index) => {
                  const Icon = getTypeIcon(item.type);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard 
                        className="p-4 cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                        glow={item.status === 'verified' ? 'green' : 'blue'}
                      >
                        <div className="aspect-square bg-secondary/50 rounded-xl flex items-center justify-center mb-4 relative overflow-hidden">
                          <Icon className="h-12 w-12 text-muted-foreground" />
                          {item.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                                <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-transparent border-l-foreground ml-1" />
                              </div>
                            </div>
                          )}
                          <Badge 
                            className="absolute top-2 right-2"
                            variant={item.status === 'verified' ? 'default' : item.status === 'pending' ? 'secondary' : 'outline'}
                          >
                            {item.status}
                          </Badge>
                        </div>
                        <h4 className="font-medium text-sm truncate mb-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.case}</p>
                        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                          <span>{item.size}</span>
                          <span>{item.uploadedAt}</span>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <GlassCard className="overflow-hidden" hover={false}>
                <div className="divide-y divide-border">
                  {evidenceItems.map((item, index) => {
                    const Icon = getTypeIcon(item.type);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.case}</p>
                        </div>
                        <Badge 
                          variant={item.status === 'verified' ? 'default' : 'secondary'}
                        >
                          {item.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">{item.size}</div>
                        <div className="text-sm text-muted-foreground">{item.uploadedAt}</div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Sidebar - Chain of Custody */}
          <div className="lg:col-span-1">
            <GlassCard className="p-5 sticky top-8" hover={false}>
              <div className="flex items-center gap-2 mb-6">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Chain of Custody</h3>
              </div>

              {selectedItem ? (
                <>
                  <div className="p-3 bg-secondary/30 rounded-xl mb-4">
                    <p className="text-sm font-medium truncate">{selectedItem.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedItem.case}</p>
                  </div>

                  <div className="space-y-4">
                    {custodyLog.map((log, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="relative flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {index < custodyLog.length - 1 && (
                            <div className="w-0.5 h-full bg-border absolute top-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm font-medium">{log.action}</p>
                          <p className="text-xs text-muted-foreground">{log.user}</p>
                          <p className="text-xs text-muted-foreground">{log.time} · {log.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1 gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Select an evidence item to view its custody log
                </p>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodEvidence;
