// Mock services for simulating backend operations

export interface InitializationStep {
  id: string;
  label: string;
  duration: number;
}

export const initializationSteps: InitializationStep[] = [
  { id: 'docker', label: 'Initializing Docker Containers...', duration: 3000 },
  { id: 'llm', label: 'Starting Local LLM Studio...', duration: 4000 },
  { id: 'services', label: 'Verifying Background Services...', duration: 2000 },
];

export const simulateInitialization = (
  onProgress: (step: InitializationStep, stepProgress: number, overallProgress: number) => void,
  onComplete: () => void
) => {
  const totalDuration = initializationSteps.reduce((acc, step) => acc + step.duration, 0);
  let elapsedTime = 0;

  const runStep = (stepIndex: number) => {
    if (stepIndex >= initializationSteps.length) {
      onComplete();
      return;
    }

    const step = initializationSteps[stepIndex];
    const stepStart = Date.now();
    const stepInterval = setInterval(() => {
      const stepElapsed = Date.now() - stepStart;
      const stepProgress = Math.min((stepElapsed / step.duration) * 100, 100);
      const overallProgress = ((elapsedTime + stepElapsed) / totalDuration) * 100;

      onProgress(step, stepProgress, Math.min(overallProgress, 100));

      if (stepElapsed >= step.duration) {
        clearInterval(stepInterval);
        elapsedTime += step.duration;
        runStep(stepIndex + 1);
      }
    }, 50);
  };

  runStep(0);
};

export interface GeneratedAccount {
  id: string;
  name: string;
  role: 'student' | 'beadle' | 'adviser' | 'coordinator' | 'parent';
  section: string;
  username: string;
  tempPassword: string;
}

export const simulateAccountGeneration = (
  count: number,
  onProgress: (current: number, total: number, account: GeneratedAccount) => void,
  onComplete: (accounts: GeneratedAccount[]) => void
) => {
  const sections = ['Section A', 'Section B', 'Section C', 'Section D'];
  const roles: GeneratedAccount['role'][] = ['student', 'beadle', 'adviser', 'coordinator', 'parent'];
  const names = [
    'Maria Santos', 'Juan Dela Cruz', 'Ana Reyes', 'Pedro Garcia',
    'Rosa Lopez', 'Miguel Torres', 'Carmen Ramos', 'Jose Fernandez',
    'Elena Martinez', 'Antonio Silva', 'Lucia Morales', 'Ricardo Cruz'
  ];

  const accounts: GeneratedAccount[] = [];
  let current = 0;

  const generateNext = () => {
    if (current >= count) {
      onComplete(accounts);
      return;
    }

    const account: GeneratedAccount = {
      id: `ACC-${Date.now()}-${current}`,
      name: names[current % names.length],
      role: roles[current % roles.length],
      section: sections[Math.floor(current / 3) % sections.length],
      username: `user${1000 + current}`,
      tempPassword: `POD${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    };

    accounts.push(account);
    current++;
    onProgress(current, count, account);

    setTimeout(generateNext, 150 + Math.random() * 100);
  };

  setTimeout(generateNext, 500);
};

export const mockNotifications = [
  {
    id: '1',
    type: 'incident',
    title: 'Incident Report #123',
    description: 'Your child was involved in a minor incident during recess.',
    date: '2024-01-15',
    acknowledged: false,
  },
  {
    id: '2',
    type: 'absence',
    title: 'Absence Warning',
    description: 'Your child has missed 3 consecutive days of class.',
    date: '2024-01-14',
    acknowledged: false,
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Parent-Teacher Conference',
    description: 'Scheduled for January 20th at 2:00 PM.',
    date: '2024-01-10',
    acknowledged: true,
  },
];
