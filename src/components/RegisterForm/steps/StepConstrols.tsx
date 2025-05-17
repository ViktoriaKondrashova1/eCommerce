import type { FormInstance } from 'antd'
import { observer } from 'mobx-react-lite'
import { AppButton } from '@/components/AppButton'
import { formStore } from '@/components/RegisterForm/model/form-store'
import { useRegistrationMessage } from '@/components/RegisterForm/use-registration-message'
import { useSteps } from '@/components/RegisterForm/use-steps'
import { checkEmailExistence } from '@/components/RegisterForm/validate'

export const StepControls = observer(
  ({
    currentStep,
    onNext,
    onPrev,
    form,
  }: {
    currentStep: number
    onNext: () => void
    onPrev: () => void
    form: FormInstance
  }) => {
    const { contextHolder, showErrorMessage, showRegistrationSucces, showStepSuccess } = useRegistrationMessage()
    const { steps } = useSteps()

    const handleNext = async () => {
      try {
        await form.validateFields()
        showStepSuccess()
        onNext()
      }
      catch {
        showErrorMessage()
      }
    }

    const handleFinish = async () => {
      try {
        await form.validateFields()
        const email = formStore.formData.email
        await checkEmailExistence(email)
        await formStore.submitForm()
        showRegistrationSucces()
      }
      catch (error) {
        if (error instanceof Error) {
          showErrorMessage(error.message)
        }
        else {
          showErrorMessage('Registration failed')
        }
      }
    }

    return (
      <div style={{ margin: '24px 0 24px 0' }}>
        {contextHolder}
        {currentStep > 0 && (
          <AppButton
            style={{ margin: '0 8px' }}
            onClick={() => onPrev()}
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
            onClick={() => void handleFinish()}
          >
            Register
          </AppButton>
        )}
      </div>
    )
  },
)
