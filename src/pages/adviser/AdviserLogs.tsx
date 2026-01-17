import { BookOpen } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AdviserLogs = () => (
  <PlaceholderPage
    title="Observation Logs"
    description="Record and review behavioral observations and notes for students."
    icon={BookOpen}
    iconBgColor="bg-admin/10"
    iconColor="text-admin"
    dashboardPath="/adviser/dashboard"
  />
);

export default AdviserLogs;
