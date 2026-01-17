import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, FileText, Upload, EyeOff, TrendingUp } from 'lucide-react';
import MinimalistCenterLayout from '@/components/layout/MinimalistCenterLayout';

const features = [
  { icon: FileText, text: 'Submit incident reports' },
  { icon: Upload, text: 'Upload photo/video evidence' },
  { icon: EyeOff, text: 'Anonymous reporting option' },
  { icon: TrendingUp, text: 'Track report status' },
];

const BeadleWelcome = () => {
  return (
    <MinimalistCenterLayout>
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-32 h-32 mx-auto bg-beadle-light rounded-3xl flex items-center justify-center mb-8"
        >
          <User className="w-16 h-16 text-beadle" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
        >
          Welcome to Report Station
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
        >
          Help maintain school safety by reporting incidents, uploading evidence, 
          and tracking your submissions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-lg mx-auto"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl text-left"
            >
              <feature.icon className="w-5 h-5 text-beadle flex-shrink-0" />
              <span className="text-sm text-foreground">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <Link
            to="/beadle/login"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-beadle text-white font-medium text-lg hover:bg-beadle/90 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Role Selection
          </Link>
        </motion.div>
      </div>
    </MinimalistCenterLayout>
  );
};

export default BeadleWelcome;
