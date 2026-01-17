import { Activity } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AiModelStatus = () => (
  <PlaceholderPage
    title="AI Model Status"
    description="Monitor AI model health, performance metrics, and system status in real-time."
    icon={Activity}
    iconBgColor="bg-adviser/10"
    iconColor="text-adviser"
    dashboardPath="/admin/dashboard"
  />
);

export default AiModelStatus;
