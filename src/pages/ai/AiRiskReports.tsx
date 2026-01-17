import { FileBarChart } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AiRiskReports = () => (
  <PlaceholderPage
    title="Risk Reports"
    description="Generate and review AI-powered risk assessment reports for proactive intervention."
    icon={FileBarChart}
    iconBgColor="bg-destructive/10"
    iconColor="text-destructive"
    dashboardPath="/pod/dashboard"
  />
);

export default AiRiskReports;
