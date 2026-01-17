import { CheckSquare } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AdviserAttendance = () => (
  <PlaceholderPage
    title="Attendance Monitoring"
    description="Track and record daily attendance for your assigned section."
    icon={CheckSquare}
    iconBgColor="bg-adviser/10"
    iconColor="text-adviser"
    dashboardPath="/adviser/dashboard"
  />
);

export default AdviserAttendance;
