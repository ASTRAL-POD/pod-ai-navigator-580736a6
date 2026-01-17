import { TrendingUp } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const BeadleStatus = () => (
  <PlaceholderPage
    title="Track Status"
    description="Monitor the progress and status of your submitted reports."
    icon={TrendingUp}
    iconBgColor="bg-adviser/10"
    iconColor="text-adviser"
    dashboardPath="/beadle/dashboard"
  />
);

export default BeadleStatus;
