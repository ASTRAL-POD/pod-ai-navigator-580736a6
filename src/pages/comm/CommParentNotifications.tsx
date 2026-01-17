import { Users } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const CommParentNotifications = () => (
  <PlaceholderPage
    title="Parent Notifications"
    description="Send and manage notifications to parents and guardians."
    icon={Users}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/pod/dashboard"
  />
);

export default CommParentNotifications;
