import { Flag } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AdviserEarlyConcerns = () => (
  <PlaceholderPage
    title="Early Concern Flagging"
    description="Flag potential issues for early intervention before they escalate."
    icon={Flag}
    iconBgColor="bg-destructive/10"
    iconColor="text-destructive"
    dashboardPath="/adviser/dashboard"
  />
);

export default AdviserEarlyConcerns;
