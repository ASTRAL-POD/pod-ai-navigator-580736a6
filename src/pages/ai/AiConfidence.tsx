import { Gauge } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AiConfidence = () => (
  <PlaceholderPage
    title="AI Confidence View"
    description="Review AI confidence levels and understand the reasoning behind automated recommendations."
    icon={Gauge}
    iconBgColor="bg-beadle/10"
    iconColor="text-beadle"
    dashboardPath="/pod/dashboard"
  />
);

export default AiConfidence;
