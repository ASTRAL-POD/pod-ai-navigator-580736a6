import { Users } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AdviserSection = () => (
  <PlaceholderPage
    title="My Section"
    description="View and manage your class section roster and student information."
    icon={Users}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/adviser/dashboard"
  />
);

export default AdviserSection;
