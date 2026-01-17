import { MessageSquare } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const CommAdviserPod = () => (
  <PlaceholderPage
    title="Adviser-POD Communication"
    description="Secure messaging channel between advisers and the Prefect of Discipline."
    icon={MessageSquare}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/adviser/dashboard"
  />
);

export default CommAdviserPod;
