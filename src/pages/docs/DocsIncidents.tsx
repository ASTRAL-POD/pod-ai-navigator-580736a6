import { FileText } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const DocsIncidents = () => (
  <PlaceholderPage
    title="Incident Reports"
    description="Generate, view, and manage official incident report documentation."
    icon={FileText}
    iconBgColor="bg-muted"
    iconColor="text-muted-foreground"
    dashboardPath="/pod/dashboard"
  />
);

export default DocsIncidents;
