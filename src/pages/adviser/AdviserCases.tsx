import { Folder } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AdviserCases = () => (
  <PlaceholderPage
    title="Assigned Cases"
    description="View and track discipline cases assigned to students in your section."
    icon={Folder}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/adviser/dashboard"
  />
);

export default AdviserCases;
