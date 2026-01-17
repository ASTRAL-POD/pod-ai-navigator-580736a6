import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Scan, CheckCircle2, User } from 'lucide-react';

interface BiometricScannerProps {
  onComplete: () => void;
  type: 'facial' | 'voice';
  autoStart?: boolean;
}

const BiometricScanner = ({ onComplete, type, autoStart = true }: BiometricScannerProps) => {
  const [phase, setPhase] = useState<'scanning' | 'processing' | 'verified'>('scanning');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoStart) return;

    const scanDuration = 3000;
    const processDuration = 1500;

    // Scanning phase
    const scanInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setPhase('processing');
          return 100;
        }
        return prev + 2;
      });
    }, scanDuration / 50);

    // Processing phase
    const processTimeout = setTimeout(() => {
      setPhase('verified');
      setTimeout(onComplete, 1000);
    }, scanDuration + processDuration);

    return () => {
      clearInterval(scanInterval);
      clearTimeout(processTimeout);
    };
  }, [autoStart, onComplete]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Scanner frame */}
      <motion.div
        className="relative w-64 h-64 rounded-3xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

        {/* Simulated camera view */}
        <div className="absolute inset-4 rounded-2xl bg-gray-800/50 backdrop-blur flex items-center justify-center">
          <motion.div
            className="w-24 h-24 rounded-full bg-gray-700/50 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <User className="w-12 h-12 text-gray-400" />
          </motion.div>
        </div>

        {/* Scanning line */}
        <AnimatePresence>
          {phase === 'scanning' && (
            <motion.div
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ top: 0 }}
              animate={{ top: ['0%', '100%', '0%'] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          )}
        </AnimatePresence>

        {/* Corner brackets */}
        {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
          <motion.div
            key={position}
            className={`absolute w-8 h-8 border-2 ${
              phase === 'verified' ? 'border-green-400' : 'border-primary'
            } transition-colors duration-300`}
            style={{
              top: position.includes('top') ? 8 : 'auto',
              bottom: position.includes('bottom') ? 8 : 'auto',
              left: position.includes('left') ? 8 : 'auto',
              right: position.includes('right') ? 8 : 'auto',
              borderTopWidth: position.includes('top') ? 2 : 0,
              borderBottomWidth: position.includes('bottom') ? 2 : 0,
              borderLeftWidth: position.includes('left') ? 2 : 0,
              borderRightWidth: position.includes('right') ? 2 : 0,
              borderRadius: position.includes('top') && position.includes('left')
                ? '12px 0 0 0'
                : position.includes('top') && position.includes('right')
                ? '0 12px 0 0'
                : position.includes('bottom') && position.includes('left')
                ? '0 0 0 12px'
                : '0 0 12px 0',
            }}
            animate={{
              opacity: phase === 'scanning' ? [0.5, 1, 0.5] : 1,
            }}
            transition={{ duration: 1, repeat: phase === 'scanning' ? Infinity : 0 }}
          />
        ))}

        {/* Verification overlay */}
        <AnimatePresence>
          {phase === 'verified' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                <CheckCircle2 className="w-20 h-20 text-green-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Status text */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 text-lg font-medium text-white mb-2">
          {phase === 'scanning' && (
            <>
              <Scan className="w-5 h-5 animate-pulse text-primary" />
              <span>{type === 'facial' ? 'Scanning Face...' : 'Analyzing Voice...'}</span>
            </>
          )}
          {phase === 'processing' && (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span>Processing Biometrics...</span>
            </>
          )}
          {phase === 'verified' && (
            <>
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-green-400">Identity Verified</span>
            </>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${
              phase === 'verified'
                ? 'bg-green-400'
                : 'bg-gradient-to-r from-primary via-purple-500 to-cyan-400'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BiometricScanner;
