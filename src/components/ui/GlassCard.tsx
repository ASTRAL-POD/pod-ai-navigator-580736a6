import { motion } from 'framer-motion';
import { ReactNode, DragEvent } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  delay?: number;
  onDragOver?: (e: DragEvent) => void;
  onDragLeave?: () => void;
  onDrop?: (e: DragEvent) => void;
}

const GlassCard = ({
  children,
  className,
  onClick,
  hover = true,
  delay = 0,
  onDragOver,
  onDragLeave,
  onDrop,
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      onClick={onClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        'glass-panel rounded-xl transition-all duration-200',
        hover && 'cursor-pointer hover:bg-white/10',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
