import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Filter, MapPin } from 'lucide-react';
import FloatingDock from '@/components/ui/FloatingDock';

const mockHotspots = [
  { id: 1, location: 'Corridor B-2', severity: 'high', incidents: 8, time: '2 min ago' },
  { id: 2, location: 'Cafeteria Zone', severity: 'medium', incidents: 4, time: '15 min ago' },
  { id: 3, location: 'Library Entrance', severity: 'low', incidents: 2, time: '1 hour ago' },
  { id: 4, location: 'Gym Locker Area', severity: 'high', incidents: 6, time: '30 min ago' },
];

const getGridCellColor = (value: number) => {
  if (value === 0) return 'bg-gray-50';
  if (value <= 1) return 'bg-emerald-100';
  if (value <= 4) return 'bg-amber-100';
  return 'bg-red-100';
};

const getGridCellGlow = (value: number) => {
  if (value <= 1) return 'shadow-emerald-200/50';
  if (value <= 4) return 'shadow-amber-200/50';
  return 'shadow-red-200/50';
};

const IntegrationHotspots = () => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  
  // Generate mock grid data
  const gridData = Array(10).fill(null).map(() => 
    Array(10).fill(null).map(() => Math.floor(Math.random() * 8))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
            Spatial Intelligence
          </span>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">Classroom Hotspots</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left - Grid Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Floor Plan Grid</h2>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded bg-emerald-100" /> Safe
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded bg-amber-100" /> Moderate
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded bg-red-100" /> Critical
                </span>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-1.5 relative">
              {gridData.map((row, rowIdx) =>
                row.map((value, colIdx) => (
                  <motion.div
                    key={`${rowIdx}-${colIdx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (rowIdx * 10 + colIdx) * 0.005 }}
                    onMouseEnter={() => setHoveredCell({ row: rowIdx, col: colIdx })}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`
                      aspect-square rounded-lg cursor-pointer transition-all duration-300
                      ${getGridCellColor(value)}
                      ${hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx 
                        ? `shadow-lg ${getGridCellGlow(value)} scale-110 z-10` 
                        : 'shadow-sm hover:shadow-md'
                      }
                    `}
                  >
                    {hoveredCell?.row === rowIdx && hoveredCell?.col === colIdx && value > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20"
                      >
                        <span className="font-semibold">{value}</span> incidents
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Right - Alerts Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Hotspot Alerts</h2>
            
            <div className="space-y-3">
              {mockHotspots.map((hotspot, idx) => (
                <motion.div
                  key={hotspot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="p-4 bg-white/80 rounded-2xl border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      p-2 rounded-xl
                      ${hotspot.severity === 'high' ? 'bg-red-50' : hotspot.severity === 'medium' ? 'bg-amber-50' : 'bg-emerald-50'}
                    `}>
                      <Bell 
                        className={`w-4 h-4 ${
                          hotspot.severity === 'high' ? 'text-red-500' : 
                          hotspot.severity === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                        }`} 
                        strokeWidth={1.5} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-medium text-gray-900">{hotspot.location}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {hotspot.incidents} incidents • {hotspot.time}
                      </p>
                    </div>
                    <span className={`
                      text-xs font-medium px-2 py-1 rounded-full
                      ${hotspot.severity === 'high' ? 'bg-red-100 text-red-600' : 
                        hotspot.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}
                    `}>
                      {hotspot.severity}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <FloatingDock 
        backPath="/pod/dashboard" 
        title="Classroom Intelligence" 
        actionIcon={Filter}
        onAction={() => {}}
      />
    </div>
  );
};

export default IntegrationHotspots;
