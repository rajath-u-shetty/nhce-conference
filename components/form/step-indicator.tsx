import { CheckIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useRef, useEffect } from 'react';

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
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (scrollContainerRef.current && stepsRef.current[currentStep]) {
      const container = scrollContainerRef.current;
      const currentStepElement = stepsRef.current[currentStep];
      
      if (currentStepElement) {
        const scrollLeft = currentStepElement.offsetLeft - (container.clientWidth / 2) + (currentStepElement.clientWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [currentStep]);

  return (
    <div 
      ref={scrollContainerRef}
      className="w-full max-w-2xl mx-auto py-4 px-2 sm:px-6 border border-zinc-700 rounded-lg bg-black/20 backdrop-blur-sm overflow-x-auto scrollbar-hide"
    >
      <div className="flex justify-start sm:justify-between min-w-max">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div 
              key={step} 
              ref={(el) => {
                stepsRef.current[index] = el;
              }}
              className="flex flex-col items-center mx-3 sm:mx-2"
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200',
                  isCompleted
                    ? 'bg-green-500 text-black'
                    : isCurrent
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300 ring-offset-2 ring-offset-black'
                    : 'bg-zinc-700 text-zinc-300'
                )}
                aria-label={`Step ${index + 1} ${
                  isCompleted ? 'completed' : isCurrent ? 'current' : 'pending'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'mt-1 text-xs text-center transition-colors duration-200 whitespace-nowrap',
                  isCompleted ? 'text-green-400' : isCurrent ? 'text-blue-400' : 'text-zinc-400'
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
