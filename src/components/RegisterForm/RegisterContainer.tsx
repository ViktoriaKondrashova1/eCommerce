import { Flex, Form, Steps } from 'antd'
import { observer } from 'mobx-react-lite'
import { StepControls } from '@/components/RegisterForm/steps/StepConstrols'
import { useSteps } from '@/components/RegisterForm/use-steps'

export const RegisterContainer = observer(() => {
  const [form] = Form.useForm()

  const { currentStep, percentStep, steps, moveNext, movePrev } = useSteps()

  const items = steps.map(item => ({ key: item.title, title: item.title, description: item.description }))
  const StepContent = steps[currentStep].content

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
          {StepContent}
        </Flex>
      </Form>

      <StepControls
        onPrev={movePrev}
        onNext={moveNext}
        currentStep={currentStep}
        form={form}
      />
    </>
  )
})
