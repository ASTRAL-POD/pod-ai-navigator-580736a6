import { GraduationCap } from 'lucide-react';
import PlaceholderPage from '@/components/page/PlaceholderPage';

const AiTraining = () => (
  <PlaceholderPage
    title="Model Training"
    description="Manage AI model training, fine-tuning, and continuous improvement processes."
    icon={GraduationCap}
    iconBgColor="bg-beadle/10"
    iconColor="text-beadle"
    dashboardPath="/admin/dashboard"
  />
);

export default AiTraining;
