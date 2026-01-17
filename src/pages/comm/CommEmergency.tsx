import { AlertOctagon } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const CommEmergency = () => (
  <PlaceholderPage
    title="Emergency Escalation"
    description="Quickly escalate urgent situations to school administration."
    icon={AlertOctagon}
    iconBgColor="bg-destructive/10"
    iconColor="text-destructive"
    dashboardPath="/beadle/dashboard"
  />
);

export default CommEmergency;
