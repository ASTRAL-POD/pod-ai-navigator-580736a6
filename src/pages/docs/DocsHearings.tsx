import { Gavel } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const DocsHearings = () => (
  <PlaceholderPage
    title="Hearing Documentation"
    description="Prepare and manage documentation for formal disciplinary hearings."
    icon={Gavel}
    iconBgColor="bg-admin/10"
    iconColor="text-admin"
    dashboardPath="/pod/dashboard"
  />
);

export default DocsHearings;
