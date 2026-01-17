import { motion } from 'framer-motion';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FloatingDockProps {
  backPath: string;
  title: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
}

const FloatingDock = ({ backPath, title, actionIcon: ActionIcon, onAction }: FloatingDockProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-4 px-6 py-3 bg-white/80 backdrop-blur-2xl border border-white/40 rounded-full shadow-2xl">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(backPath)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
        </motion.button>
        
        <span className="text-[15px] font-medium text-gray-900 tracking-tight">
          {title}
        </span>
        
        {ActionIcon && onAction && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="p-2 rounded-full hover:bg-blue-50 text-blue-600 transition-colors"
            aria-label="Primary action"
          >
            <ActionIcon className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default FloatingDock;
