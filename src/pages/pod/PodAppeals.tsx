import { Scale } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const PodAppeals = () => (
  <PlaceholderPage
    title="Appeals Management"
    description="Handle disciplinary appeals. Review submissions, schedule hearings, and manage outcomes."
    icon={Scale}
    iconBgColor="bg-admin/10"
    iconColor="text-admin"
    dashboardPath="/pod/dashboard"
  />
);

export default PodAppeals;
