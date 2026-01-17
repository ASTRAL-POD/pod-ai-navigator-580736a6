import { Upload } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const DocsMinistryExport = () => (
  <PlaceholderPage
    title="Ministry Export"
    description="Export data and reports in formats required by the Ministry of Education."
    icon={Upload}
    iconBgColor="bg-adviser/10"
    iconColor="text-adviser"
    dashboardPath="/admin/dashboard"
  />
);

export default DocsMinistryExport;
