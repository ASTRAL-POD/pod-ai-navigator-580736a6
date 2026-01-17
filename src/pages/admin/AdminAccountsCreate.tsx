import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, Sparkles, Download, Users, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { simulateAccountGeneration, GeneratedAccount } from '@/lib/mock-services';

type Phase = 'upload' | 'processing' | 'complete';

const AdminAccountsCreate = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('upload');
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [accounts, setAccounts] = useState<GeneratedAccount[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = useCallback(() => {
    setPhase('processing');
    const accountCount = 12;
    setProgress({ current: 0, total: accountCount });

    simulateAccountGeneration(
      accountCount,
      (current, total) => {
        setProgress({ current, total });
      },
      (generatedAccounts) => {
        setAccounts(generatedAccounts);
        setPhase('complete');
      }
    );
  }, []);

  const groupedAccounts = accounts.reduce((acc, account) => {
    if (!acc[account.section]) {
      acc[account.section] = [];
    }
    acc[account.section].push(account);
    return acc;
  }, {} as Record<string, GeneratedAccount[]>);

  const handleDownload = () => {
    const csv = [
      ['Name', 'Role', 'Section', 'Username', 'Temporary Password'],
      ...accounts.map(a => [a.name, a.role, a.section, a.username, a.tempPassword])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pod-ai-credentials.csv';
    a.click();
  };

  const roleColors: Record<string, string> = {
    student: 'bg-white/10 text-white/80',
    beadle: 'bg-white/10 text-white/80',
    adviser: 'bg-white/10 text-white/80',
    coordinator: 'bg-white/10 text-white/80',
    parent: 'bg-white/10 text-white/80',
  };

  return (
    <DashboardLayout dockType="admin">
      <div className="h-full flex flex-col py-6 overflow-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-header flex items-center gap-4 mb-4"
        >
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-white/95">Account Generation</h1>
            <p className="text-xs text-white/50">Mass-create user accounts with AI</p>
          </div>
        </motion.header>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {phase === 'upload' && (
              <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GlassCard
                  className="p-8"
                  hover={false}
                  onDragOver={(e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); handleFileUpload(); }}
                >
                  <div className={`border border-dashed rounded-xl p-8 text-center transition-all ${
                    isDragging ? 'border-white/40 bg-white/5' : 'border-white/20 hover:border-white/30'
                  }`}>
                    <div className="w-16 h-16 mx-auto rounded-xl bg-white/10 flex items-center justify-center mb-4">
                      <FileSpreadsheet className="w-8 h-8 text-white/70" />
                    </div>
                    <h3 className="text-lg font-medium text-white/90 mb-2">Upload Adviser Data</h3>
                    <p className="text-sm text-white/50 mb-4">Drag and drop CSV file or click to browse</p>
                    <button
                      onClick={handleFileUpload}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 text-sm font-medium transition-colors"
                    >
                      <Upload className="w-4 h-4 inline-block mr-2" />
                      Select File
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {phase === 'processing' && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GlassCard className="p-8 text-center" hover={false}>
                  <motion.div
                    className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-8 h-8 text-white/70" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-white/90 mb-2">AI Generating Accounts</h3>
                  <p className="text-sm text-white/50 mb-4">Creating secure credentials...</p>
                  <div className="max-w-xs mx-auto">
                    <div className="flex justify-between text-xs text-white/50 mb-2">
                      <span>Progress</span>
                      <span>{progress.current} / {progress.total}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white/30"
                        initial={{ width: 0 }}
                        animate={{ width: `${(progress.current / progress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {phase === 'complete' && (
              <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                <GlassCard className="p-4" hover={false}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white/90">{accounts.length} Accounts Generated</h3>
                      <p className="text-xs text-white/50">Credentials created securely</p>
                    </div>
                    <button
                      onClick={handleDownload}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/80 text-sm font-medium transition-colors"
                    >
                      <Download className="w-4 h-4 inline-block mr-1" />
                      CSV
                    </button>
                  </div>
                </GlassCard>

                {Object.entries(groupedAccounts).map(([section, sectionAccounts]) => (
                  <GlassCard key={section} className="p-4" hover={false}>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-white/60" />
                      <span className="font-medium text-white/80 text-sm">{section}</span>
                      <span className="text-xs text-white/40">{sectionAccounts.length} accounts</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {sectionAccounts.map((account) => (
                        <div key={account.id} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/70">
                            {account.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white/80 truncate">{account.name}</p>
                            <p className="text-xs text-white/40 font-mono truncate">{account.username}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminAccountsCreate;
