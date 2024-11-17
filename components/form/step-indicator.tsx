import { cn } from "@/lib/utils"
import { Check } from 'lucide-react'

type StepIndicatorProps = {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { label: 'Author' },
    { label: 'Details' },
    { label: 'Co-Author 1' },
    { label: 'Co-Author 2' },
    { label: 'Co-Author 3' },
    { label: 'Co-Author 4' },
    { label: 'Co-Author 5' },
    { label: 'Upload' }
  ]

  // Calculate the progress percentage for the current step
  const progress = (currentStep / (steps.length - 1)) * 100

  return (
    <div 
      className="relative w-full max-w-2xl mx-auto py-1 px-3 border border-muted rounded-full"
      role="navigation"
      aria-label="Form progress"
    >
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="relative flex flex-col items-center z-10"
          >
            {/* Connecting Lines */}
            {index < steps.length - 1 && (
              <div className="absolute top-[11px] left-[calc(50%+11px)] w-[calc(100%-22px)] h-0.5 flex items-center">
                <div className="w-full h-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full bg-primary transition-all duration-300 ease-in-out rounded-full",
                      // The line should appear for steps before the current step
                      index < currentStep
                        ? "w-full"
                        : index === currentStep
                        ? `w-[${progress}%]`  // Set the progress line for the current step
                        : "w-0"  // For steps after the current step, the line should be hidden
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step Indicator */}
            <div
              className={cn(
                "w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300",
                index < currentStep 
                  ? "border-primary bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "border-primary bg-background text-primary"
                  : "border-muted bg-background text-muted-foreground"
              )}
              aria-current={index === currentStep ? "step" : undefined}
              aria-label={`Step ${index + 1} ${
                index < currentStep ? 'completed' : 
                index === currentStep ? 'current' : 
                'pending'
              }`}
            >
              {index < currentStep ? (
                <Check className="w-2.5 h-2.5" />
              ) : (
                <span className="w-2.5 h-2.5 flex items-center justify-center text-[9px] font-medium">
                  {index + 1}
                </span>
              )}
            </div>
            <span 
              className={cn(
                "mt-0.5 text-[8px] font-medium",
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

