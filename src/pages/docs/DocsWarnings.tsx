import { AlertCircle } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const DocsWarnings = () => (
  <PlaceholderPage
    title="Warning Notices"
    description="Create and manage formal warning notices for students."
    icon={AlertCircle}
    iconBgColor="bg-admin/10"
    iconColor="text-admin"
    dashboardPath="/pod/dashboard"
  />
);

export default DocsWarnings;
