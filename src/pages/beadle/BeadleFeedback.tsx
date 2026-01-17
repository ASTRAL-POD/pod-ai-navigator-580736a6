import { MessageCircle } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const BeadleFeedback = () => (
  <PlaceholderPage
    title="Feedback"
    description="Receive updates and feedback on your submitted reports."
    icon={MessageCircle}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/beadle/dashboard"
  />
);

export default BeadleFeedback;
