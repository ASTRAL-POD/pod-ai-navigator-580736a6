import { Ban } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const DocsSuspensions = () => (
  <PlaceholderPage
    title="Suspension Notices"
    description="Generate and manage suspension documentation and notices."
    icon={Ban}
    iconBgColor="bg-destructive/10"
    iconColor="text-destructive"
    dashboardPath="/pod/dashboard"
  />
);

export default DocsSuspensions;
