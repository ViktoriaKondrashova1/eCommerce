import type { FormInstance } from 'antd'
import { Button, Form, message, Steps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
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

    const successRegister = () => {
      messageApi.open({
        type: 'success',
        content: 'You registereted successfully!',
      })
    }

    const successStep = () => {
      messageApi.open({
        type: 'success',
        content: 'You step date correct!',
      })
    }

    const error = () => {
      messageApi.open({
        type: 'error',
        content: 'Please fill in all required fields correctly',
      })
    }

    const handleNext = async () => {
      try {
        await form.validateFields()
        successStep()
        onNext()
      }
      catch {
        error()
      }
    }

    const handleFinish = async () => {
      try {
        await form.validateFields()
        void formStore.submitForm()
        successRegister()
      }
      catch {
        error()
      }
    }

    return (
      <div style={{ margin: '24px 0 24px 0' }}>
        {contextHolder}
        {currentStep > 0 && (
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => onPrev()}
          >
            Back
          </Button>
        )}

        {currentStep < steps.length - 1 && (
          <Button
            type="primary"
            // eslint-disable-next-line ts/no-misused-promises
            onClick={async () => handleNext()}
          >
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            type="primary"
            // eslint-disable-next-line ts/no-misused-promises
            onClick={async () => handleFinish()}
          >
            Register
          </Button>
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
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
        layout="vertical"
        className="mb-8"
      >
        {steps[currentStep].content}
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
