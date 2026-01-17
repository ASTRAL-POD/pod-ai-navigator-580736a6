import { BarChart } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AdviserAbsenceAnalytics = () => (
  <PlaceholderPage
    title="Absence Analytics"
    description="Analyze attendance patterns and identify students with concerning absence rates."
    icon={BarChart}
    iconBgColor="bg-beadle/10"
    iconColor="text-beadle"
    dashboardPath="/adviser/dashboard"
  />
);

export default AdviserAbsenceAnalytics;
