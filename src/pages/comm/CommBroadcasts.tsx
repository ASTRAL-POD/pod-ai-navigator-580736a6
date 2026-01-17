import { Radio } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const CommBroadcasts = () => (
  <PlaceholderPage
    title="Broadcast Announcements"
    description="Send broadcast messages to groups or the entire school community."
    icon={Radio}
    iconBgColor="bg-adviser/10"
    iconColor="text-adviser"
    dashboardPath="/pod/dashboard"
  />
);

export default CommBroadcasts;
