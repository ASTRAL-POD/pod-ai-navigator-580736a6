import { Cpu } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AiConfig = () => (
  <PlaceholderPage
    title="AI Configuration"
    description="Configure AI models, thresholds, and behavioral parameters for the system."
    icon={Cpu}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/admin/dashboard"
  />
);

export default AiConfig;
