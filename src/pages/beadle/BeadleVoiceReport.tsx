import { Mic } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const BeadleVoiceReport = () => (
  <PlaceholderPage
    title="Voice Report"
    description="Record an audio report describing the incident in your own words."
    icon={Mic}
    iconBgColor="bg-beadle/10"
    iconColor="text-beadle"
    dashboardPath="/beadle/dashboard"
  />
);

export default BeadleVoiceReport;
