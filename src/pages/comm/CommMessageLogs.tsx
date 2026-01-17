import { MessageSquare } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const CommMessageLogs = () => (
  <PlaceholderPage
    title="Message Logs"
    description="View history of all communications sent through the system."
    icon={MessageSquare}
    iconBgColor="bg-muted"
    iconColor="text-muted-foreground"
    dashboardPath="/pod/dashboard"
  />
);

export default CommMessageLogs;
