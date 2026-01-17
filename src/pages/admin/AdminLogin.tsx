import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import MinimalistCenterLayout from '@/components/layout/MinimalistCenterLayout';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <MinimalistCenterLayout>
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto bg-admin-light rounded-2xl flex items-center justify-center mb-4">
            <Settings className="w-8 h-8 text-admin" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-admin/20 focus:border-admin transition-all"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-admin/20 focus:border-admin transition-all"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border text-admin focus:ring-admin/20"
              />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Link to="#" className="text-sm text-admin hover:text-admin/80 transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 rounded-xl bg-admin text-white font-medium hover:bg-admin/90 transition-colors"
          >
            Login
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <Link
            to="/admin/welcome"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Welcome
          </Link>
        </motion.div>
      </div>
    </MinimalistCenterLayout>
  );
};

export default AdminLogin;
