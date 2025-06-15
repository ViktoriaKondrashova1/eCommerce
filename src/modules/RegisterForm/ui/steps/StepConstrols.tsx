import { observer } from 'mobx-react-lite'
import { AppButton } from '@/components/AppButton'
import { useSteps } from '@/modules/RegisterForm/ui/use-steps.ts'
import { useNotify } from '@/shared/hooks/use-notify.tsx'

export const StepControls = observer(
  ({
    currentStep,
    onNext,
    onPrev,
    onFinish,
  }: {
    currentStep: number
    onNext: () => Promise<void>
    onPrev: () => Promise<void>
    onFinish: () => Promise<void>
  }) => {
    const { showErrorNotify } = useNotify()
    const { steps } = useSteps()

    const handleNext = async () => {
      try {
        void onNext()
      }
      catch {
        showErrorNotify('Fill in all required fields correctly')
      }
    }

    return (
      <div style={{ margin: '24px 0 24px 0' }}>
        {currentStep > 0 && (
          <AppButton
            style={{ margin: '0 8px' }}
            onClick={() => void onPrev()}
          >
            Back
          </AppButton>
        )}

        {currentStep < steps.length - 1 && (
          <AppButton
            type="primary"
            onClick={() => void handleNext()}
          >
            Next
          </AppButton>
        )}
        {currentStep === steps.length - 1 && (
          <AppButton
            type="primary"
            onClick={() => void onFinish()}
          >
            Register
          </AppButton>
        )}
      </div>
    )
  },
)
