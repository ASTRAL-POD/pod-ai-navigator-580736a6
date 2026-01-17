import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface FloatingPadProps {
  items: NavItem[];
  className?: string;
}

const FloatingPad = ({ items, className }: FloatingPadProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50',
        className
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-2xl border border-white/50 rounded-full shadow-2xl">
        {items.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className={cn(
                'relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-300',
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <motion.span
                initial={false}
                animate={{
                  width: isActive ? 'auto' : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-full bg-primary -z-10"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FloatingPad;
