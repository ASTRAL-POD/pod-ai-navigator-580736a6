import { GitBranch } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const PodBehaviorTimeline = () => (
  <PlaceholderPage
    title="Behavior Timeline"
    description="Visualize student behavior history over time to understand patterns and triggers."
    icon={GitBranch}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/pod/dashboard"
  />
);

export default PodBehaviorTimeline;
