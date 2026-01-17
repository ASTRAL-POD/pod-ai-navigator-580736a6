import { motion } from 'framer-motion';

interface FuturisticLoaderProps {
  progress?: number;
  size?: 'sm' | 'md' | 'lg';
  showCore?: boolean;
}

const FuturisticLoader = ({ progress = 0, size = 'lg', showCore = true }: FuturisticLoaderProps) => {
  const sizes = {
    sm: { container: 80, core: 24, ring: 3 },
    md: { container: 150, core: 48, ring: 4 },
    lg: { container: 280, core: 80, ring: 6 },
  };

  const s = sizes[size];
  const circumference = 2 * Math.PI * (s.container / 2 - s.ring * 2);
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: s.container, height: s.container }}>
      {/* Outer rotating ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg width={s.container} height={s.container} className="absolute">
          <circle
            cx={s.container / 2}
            cy={s.container / 2}
            r={s.container / 2 - s.ring}
            fill="none"
            stroke="rgba(37, 99, 235, 0.1)"
            strokeWidth={s.ring}
          />
        </svg>
      </motion.div>

      {/* Progress ring */}
      <svg width={s.container} height={s.container} className="absolute -rotate-90">
        <circle
          cx={s.container / 2}
          cy={s.container / 2}
          r={s.container / 2 - s.ring * 2}
          fill="none"
          stroke="rgba(37, 99, 235, 0.15)"
          strokeWidth={s.ring}
        />
        <motion.circle
          cx={s.container / 2}
          cy={s.container / 2}
          r={s.container / 2 - s.ring * 2}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={s.ring}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner pulsing rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/20"
          style={{
            width: s.core + i * 30,
            height: s.core + i * 30,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Breathing core */}
      {showCore && (
        <motion.div
          className="relative rounded-full bg-gradient-to-br from-primary via-purple-500 to-cyan-500 shadow-2xl"
          style={{ width: s.core, height: s.core }}
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(37, 99, 235, 0.4)',
              '0 0 60px rgba(37, 99, 235, 0.6)',
              '0 0 20px rgba(37, 99, 235, 0.4)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-2 rounded-full bg-white/30 backdrop-blur-sm" />
        </motion.div>
      )}

      {/* Orbiting particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            top: '50%',
            left: '50%',
            marginTop: -4,
            marginLeft: -4,
          }}
          animate={{
            x: [
              Math.cos((i * Math.PI) / 2) * (s.container / 2 - s.ring * 3),
              Math.cos((i * Math.PI) / 2 + Math.PI) * (s.container / 2 - s.ring * 3),
              Math.cos((i * Math.PI) / 2) * (s.container / 2 - s.ring * 3),
            ],
            y: [
              Math.sin((i * Math.PI) / 2) * (s.container / 2 - s.ring * 3),
              Math.sin((i * Math.PI) / 2 + Math.PI) * (s.container / 2 - s.ring * 3),
              Math.sin((i * Math.PI) / 2) * (s.container / 2 - s.ring * 3),
            ],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default FuturisticLoader;
