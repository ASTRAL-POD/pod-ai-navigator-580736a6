import { Upload } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const BeadleEvidence = () => (
  <PlaceholderPage
    title="Upload Evidence"
    description="Upload photos, videos, or documents as evidence for your report."
    icon={Upload}
    iconBgColor="bg-admin/10"
    iconColor="text-admin"
    dashboardPath="/beadle/dashboard"
  />
);

export default BeadleEvidence;
