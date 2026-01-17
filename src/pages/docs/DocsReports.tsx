import { FileBarChart } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const DocsReports = () => (
  <PlaceholderPage
    title="Term Reports"
    description="Generate comprehensive term reports summarizing disciplinary activities."
    icon={FileBarChart}
    iconBgColor="bg-adviser/10"
    iconColor="text-adviser"
    dashboardPath="/pod/dashboard"
  />
);

export default DocsReports;
