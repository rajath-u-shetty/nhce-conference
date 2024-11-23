import { CheckIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    'Author',
    'Details',
    'Co-Author 1',
    'Co-Author 2',
    'Co-Author 3',
    'Co-Author 4',
    'Co-Author 5',
    'Upload',
  ];

  return (
    <div className="w-full max-w-2xl mx-auto py-4 px-6 border border-muted rounded-lg flex flex-wrap justify-between gap-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep; // Adjusted to correctly reflect completion
        const isCurrent = index === currentStep; // Matches zero-based `index` with `currentStep`

        return (
          <div key={step} className="flex flex-col items-center">
            {/* Step Circle */}
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center',
                isCompleted
                  ? 'bg-blue-500 text-white'
                  : isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gray-200 text-muted-foreground'
              )}
              aria-label={`Step ${index + 1} ${
                isCompleted ? 'completed' : isCurrent ? 'current' : 'pending'
              }`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {isCompleted ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <span className="font-medium">{index + 1}</span>
              )}
            </div>
            {/* Step Label */}
            <span
              className={cn(
                'mt-2 text-xs text-center',
                isCompleted || isCurrent ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

