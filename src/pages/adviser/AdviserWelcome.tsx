import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, CheckSquare, BookOpen, Flag, MessageSquare } from 'lucide-react';

const features = [
  { icon: CheckSquare, text: 'Track section attendance' },
  { icon: BookOpen, text: 'Submit observations' },
  { icon: Flag, text: 'View assigned cases' },
  { icon: MessageSquare, text: 'Communicate with POD' },
];

const AdviserWelcome = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex items-center justify-center">
      <div className="w-[70vw] max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 mx-auto glass-panel rounded-2xl flex items-center justify-center mb-6"
        >
          <Briefcase className="w-10 h-10 text-white/80" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl font-semibold text-white/95 mb-3"
        >
          Welcome to Adviser Portal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/50 text-sm mb-8 max-w-md mx-auto"
        >
          Monitor your assigned section, track attendance, flag early concerns, 
          and stay connected with the Prefect of Discipline.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 gap-3 mb-8 max-w-sm mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 glass-panel rounded-lg text-left"
            >
              <feature.icon className="w-4 h-4 text-white/60 flex-shrink-0" />
              <span className="text-xs text-white/70">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <Link
            to="/adviser/login"
            className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 text-white/90 font-medium text-sm transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/"
            className="text-xs text-white/40 hover:text-white/60 transition-colors"
          >
            Back to Role Selection
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AdviserWelcome;
