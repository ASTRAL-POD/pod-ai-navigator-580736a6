import { Edit } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AdviserStudentUpdate = () => (
  <PlaceholderPage
    title="Student Information Update"
    description="Update and maintain student information and records for your section."
    icon={Edit}
    iconBgColor="bg-muted"
    iconColor="text-muted-foreground"
    dashboardPath="/adviser/dashboard"
  />
);

export default AdviserStudentUpdate;
