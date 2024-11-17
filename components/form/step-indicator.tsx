import { cn } from "@/lib/utils"
import { Check } from 'lucide-react'

type StepIndicatorProps = {
  currentStep: number
  totalSteps: number
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = [
    { label: 'Author' },
    { label: 'Co-Author 1' },
    { label: 'Co-Author 2' },
    { label: 'Co-Author 3' },
    { label: 'Co-Author 4' },
    { label: 'Co-Author 5' },
    { label: 'Upload' }
  ]

  return (
    <div 
      className="relative w-full max-w-3xl mx-auto py-2 px-4 border border-muted rounded-full"
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
              <div className="absolute top-[13px] left-[calc(50%+13px)] w-[calc(100%-26px)] h-1 flex items-center">
                <div className="w-full h-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full bg-primary transition-all duration-300 ease-in-out rounded-full",
                      index < currentStep ? "w-full" : "w-0"
                    )}
                  />
                </div>
              </div>
            )}

            {/* Step Indicator */}
            <div
              className={cn(
                "w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300",
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
                <Check className="w-3 h-3" />
              ) : (
                <span className="w-3 h-3 flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </span>
              )}
            </div>
            <span 
              className={cn(
                "mt-1 text-[10px] font-medium",
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
