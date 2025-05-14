import type { FormInstance } from 'antd'
import { Flex, Form, message, Steps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AppButton } from '../AppButton'
import { formStore } from './model/formStore'
import { Billing } from './steps/Billing'
import { PersonalInfo } from './steps/Info'
import { Passwords } from './steps/Password'
import { Shipping } from './steps/Shipping'

const steps = [
  {
    title: 'Info',
    description: 'Personal info about user',
    content: <PersonalInfo />,
  },
  {
    title: 'Shipping',
    description: 'Addresses for shipping',
    content: <Shipping />,
  },
  {
    title: 'Billing',
    description: 'Addresses for billing',
    content: <Billing />,
  },
  {
    title: 'Finish',
    description: 'Input password & finish registration',
    content: <Passwords />,
  },
] as const

const StepControls = observer(
  ({
    currentStep,
    onNext,
    onPrev,
    form,
  }: {
    currentStep: number
    onNext: () => void
    onPrev: () => void
    form: FormInstance<unknown>
  }) => {
    const [messageApi, contextHolder] = message.useMessage()

    const showRegistrationSucces = () => {
      messageApi.open({
        type: 'success',
        content: 'You registered successfully!',
      })
    }

    const showStepSuccess = () => {
      messageApi.open({
        type: 'success',
        content: 'You step data is correct!',
      })
    }

    const showErrorMessage = () => {
      messageApi.open({
        type: 'error',
        content: 'Please fill in all required fields correctly',
      })
    }

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
        void formStore.submitForm()
        showRegistrationSucces()
      }
      catch {
        showErrorMessage()
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

export const RegisterContainer = observer(() => {
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [percentStep, setPercentStep] = useState(0)

  const next = () => {
    setCurrentStep(prev => prev + 1)
    setPercentStep(prev => prev + 25)
  }

  const prev = () => {
    setCurrentStep(prev => prev - 1)
    setPercentStep(prev => prev - 25)
  }

  const items = steps.map(item => ({ key: item.title, title: item.title, description: item.description }))

  return (
    <>
      <Steps
        style={{ marginBottom: '2rem' }}
        labelPlacement="vertical"
        current={currentStep}
        percent={percentStep}
        items={items}
      />
      <Form
        form={form}
        layout="vertical"
        className="mb-8"
      >
        <Flex
          justify="center"
          align="center"
          vertical
          style={{ width: '100%' }}
        >
          {steps[currentStep].content}
        </Flex>
      </Form>

      <StepControls
        onPrev={prev}
        onNext={next}
        currentStep={currentStep}
        form={form}
      />
    </>
  )
})
