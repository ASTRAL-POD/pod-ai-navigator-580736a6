import { Bell } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const CommAdviserAlerts = () => (
  <PlaceholderPage
    title="Adviser Alerts"
    description="Receive important alerts and notifications from the POD office."
    icon={Bell}
    iconBgColor="bg-admin/10"
    iconColor="text-admin"
    dashboardPath="/adviser/dashboard"
  />
);

export default CommAdviserAlerts;
