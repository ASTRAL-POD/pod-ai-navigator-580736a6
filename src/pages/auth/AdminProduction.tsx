import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Mic, KeyRound, Shield, Unlock, ChevronRight } from 'lucide-react';
import BiometricScanner from '@/components/ui/BiometricScanner';
import { toast } from 'sonner';

type AuthMethod = 'facial' | 'voice' | 'manual';
type AuthPhase = 'select' | 'scanning' | 'success';

const AdminProduction = () => {
  const navigate = useNavigate();
  const [authMethod, setAuthMethod] = useState<AuthMethod | null>(null);
  const [phase, setPhase] = useState<AuthPhase>('select');
  const [manualCredentials, setManualCredentials] = useState({ username: '', password: '' });

  const handleMethodSelect = (method: AuthMethod) => {
    setAuthMethod(method);
    if (method === 'facial' || method === 'voice') {
      setPhase('scanning');
    }
  };

  const handleBiometricComplete = () => {
    setPhase('success');
    toast.success('Welcome back, Administrator. System is online.', {
      duration: 3000,
      icon: <Shield className="w-5 h-5 text-primary" />,
    });
    setTimeout(() => navigate('/admin/dashboard'), 2000);
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase('success');
    toast.success('Welcome back, Administrator. System is online.', {
      duration: 3000,
      icon: <Shield className="w-5 h-5 text-primary" />,
    });
    setTimeout(() => navigate('/admin/dashboard'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37, 99, 235, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37, 99, 235, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Administrator Access</h1>
          <p className="text-gray-400">High-security authentication required</p>
        </motion.div>

        {/* Main content card */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {/* Method selection */}
            {phase === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-gray-400 text-center text-sm mb-6">
                  Select your authentication method
                </p>

                {/* Facial Recognition */}
                <motion.button
                  onClick={() => handleMethodSelect('facial')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Scan className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium">Facial Recognition</h3>
                    <p className="text-gray-500 text-sm">Scan your face for quick access</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-primary transition-colors" />
                </motion.button>

                {/* Voice Verification */}
                <motion.button
                  onClick={() => handleMethodSelect('voice')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Mic className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium">Voice Verification</h3>
                    <p className="text-gray-500 text-sm">Speak your passphrase</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </motion.button>

                {/* Manual Override */}
                <motion.button
                  onClick={() => handleMethodSelect('manual')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/50 transition-all group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <KeyRound className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium">Manual Override</h3>
                    <p className="text-gray-500 text-sm">Enter credentials manually</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transition-colors" />
                </motion.button>
              </motion.div>
            )}

            {/* Biometric scanning */}
            {phase === 'scanning' && authMethod && (authMethod === 'facial' || authMethod === 'voice') && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-4"
              >
                <BiometricScanner
                  type={authMethod}
                  onComplete={handleBiometricComplete}
                />
                <button
                  onClick={() => setPhase('select')}
                  className="mt-6 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            )}

            {/* Manual login form */}
            {phase === 'select' && authMethod === 'manual' && (
              <motion.form
                key="manual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleManualLogin}
                className="space-y-4"
              >
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Username</label>
                  <input
                    type="text"
                    value={manualCredentials.username}
                    onChange={(e) => setManualCredentials({ ...manualCredentials, username: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Password</label>
                  <input
                    type="password"
                    value={manualCredentials.password}
                    onChange={(e) => setManualCredentials({ ...manualCredentials, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Enter password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:opacity-90 transition-opacity"
                >
                  Authenticate
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod(null)}
                  className="w-full text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Back to options
                </button>
              </motion.form>
            )}

            {/* Success state */}
            {phase === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30 mb-6"
                >
                  <Unlock className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Access Granted</h2>
                <p className="text-gray-400 text-center">
                  Redirecting to dashboard...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Security note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-600 text-xs mt-6"
        >
          All access attempts are logged and monitored
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AdminProduction;
