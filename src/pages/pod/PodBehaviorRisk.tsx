import { AlertOctagon } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const PodBehaviorRisk = () => (
  <PlaceholderPage
    title="Behavior Risk Dashboard"
    description="Analyze student behavior patterns and identify at-risk individuals for early intervention."
    icon={AlertOctagon}
    iconBgColor="bg-destructive/10"
    iconColor="text-destructive"
    dashboardPath="/pod/dashboard"
  />
);

export default PodBehaviorRisk;
