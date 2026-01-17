import { Shield } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const BeadleSafety = () => (
  <PlaceholderPage
    title="Safety Information"
    description="Access important safety guidelines and reporting procedures."
    icon={Shield}
    iconBgColor="bg-muted"
    iconColor="text-muted-foreground"
    dashboardPath="/beadle/dashboard"
  />
);

export default BeadleSafety;
