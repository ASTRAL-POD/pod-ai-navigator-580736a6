import { Mail } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const DocsParentLetters = () => (
  <PlaceholderPage
    title="Parent Letters"
    description="Create and send formal correspondence to parents and guardians."
    icon={Mail}
    iconBgColor="bg-pod/10"
    iconColor="text-pod"
    dashboardPath="/pod/dashboard"
  />
);

export default DocsParentLetters;
