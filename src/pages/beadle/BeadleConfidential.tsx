import { EyeOff } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const BeadleConfidential = () => (
  <PlaceholderPage
    title="Confidential Report"
    description="Submit a confidential or anonymous report for sensitive situations."
    icon={EyeOff}
    iconBgColor="bg-destructive/10"
    iconColor="text-destructive"
    dashboardPath="/beadle/dashboard"
  />
);

export default BeadleConfidential;
