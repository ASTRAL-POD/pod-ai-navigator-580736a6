import { FileSearch } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const PodAuditLogs = () => (
  <PlaceholderPage
    title="Audit Logs"
    description="Review comprehensive system audit logs for compliance, security, and accountability purposes."
    icon={FileSearch}
    iconBgColor="bg-beadle/10"
    iconColor="text-beadle"
    dashboardPath="/pod/dashboard"
  />
);

export default PodAuditLogs;
