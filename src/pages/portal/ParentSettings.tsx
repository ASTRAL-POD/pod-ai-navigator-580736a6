import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Users, Pencil, Plus, Save, Trash2 } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const mockChildren = [
  { id: 1, name: 'Juan Dela Cruz', grade: '10-A' },
  { id: 2, name: 'Maria Dela Cruz', grade: '7-B' },
];

const ParentSettings = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-4 md:p-8">
      <div className="max-w-lg mx-auto">
        <BackButton dashboardPath="/parent/dashboard" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary/10">
              <Settings className="w-8 h-8 text-primary" />
            </div>
            Parent Settings
          </h1>
          <p className="text-muted-foreground mt-2">Control your preferences and linked students</p>
        </motion.div>

        {/* Notification Preferences */}
        <GlassCard className="p-4 mb-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" /> Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Attendance Alerts</Label>
                <p className="text-xs text-muted-foreground">Get notified when your child enters/exits</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Incident Alerts</Label>
                <p className="text-xs text-muted-foreground">Immediate alerts for any incidents</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>News & Events</Label>
                <p className="text-xs text-muted-foreground">School announcements and updates</p>
              </div>
              <Switch />
            </div>
          </div>
        </GlassCard>

        {/* Linked Students */}
        <GlassCard className="p-4 mb-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Linked Students
          </h3>
          <div className="space-y-3">
            {mockChildren.map((child) => (
              <div key={child.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold">
                    {child.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{child.name}</p>
                    <p className="text-xs text-muted-foreground">{child.grade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-3 gap-2">
            <Plus className="w-4 h-4" /> Link Another Student
          </Button>
        </GlassCard>

        {/* Digital Signature */}
        <GlassCard className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Pencil className="w-5 h-5 text-primary" /> Digital Signature
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Draw your signature below. This will be used for minor permission slips.
          </p>
          <div className="border-2 border-dashed border-border rounded-lg p-2 mb-3">
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              className="w-full bg-white rounded cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearCanvas} className="gap-2">
              <Trash2 className="w-4 h-4" /> Clear
            </Button>
            <Button className="flex-1 gap-2">
              <Save className="w-4 h-4" /> Save Signature
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ParentSettings;
