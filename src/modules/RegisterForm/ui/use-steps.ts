import { useState } from 'react'
import { steps } from '@/modules/RegisterForm/ui/steps/steps-constructor.tsx'

export function useSteps() {
  const [currentStep, setCurrentStep] = useState<number>(0)

  const moveNext = () => {
    setCurrentStep(prev => prev + 1)
  }

  const movePrev = () => {
    setCurrentStep(prev => prev - 1)
  }

  return { steps, currentStep, moveNext, movePrev }
}
