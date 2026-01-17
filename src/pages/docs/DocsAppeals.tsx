import { Scale } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const DocsAppeals = () => (
  <PlaceholderPage
    title="Appeal Documents"
    description="Manage and generate appeal-related documentation and forms."
    icon={Scale}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/pod/dashboard"
  />
);

export default DocsAppeals;
