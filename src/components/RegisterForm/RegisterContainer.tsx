import type { ErrorResponse } from '@commercetools/platform-sdk'
import { Flex, Form, Steps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { formStore } from '@/components/RegisterForm/model/form-store'
import { RegisterFormProvider } from '@/components/RegisterForm/model/registration-form-context'
import { StepControls } from '@/components/RegisterForm/steps/StepConstrols'
import { useSteps } from '@/components/RegisterForm/use-steps'
import { fetchMe } from '@/entities/customer/api/fetch-me'
import { loginCustomer } from '@/entities/customer/api/sign-in'
import { customerStore } from '@/entities/customer/model/customer.store'
import { globalStore } from '@/entities/global/model/global.store'
import { setCommerceApiFlow } from '@/shared/configs/commerce-client'
import { useNotify } from '@/shared/hooks/use-notify'
import { isNonNullable } from '@/shared/types/is-non-nullable'
import { isType } from '@/shared/types/is-type'

export const RegisterContainer = observer(() => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { showErrorNotify } = useNotify()
  const { currentStep, steps, moveNext, movePrev } = useSteps()

  const items = steps.map(item => ({ key: item.title, title: item.title, description: item.description }))
  const StepContent = steps[currentStep].content

  const handleNext = async () => {
    await form.validateFields()
    moveNext()
  }

  const handlePrev = async () => {
    await form.validateFields()
    movePrev()
  }

  const handleFinish = async () => {
    try {
      await form.validateFields()

      globalStore.setLoading(true)

      void formStore.submitForm().then((res) => {
        if (res.statusCode === 201) {
          setCommerceApiFlow({ flow: 'password', payload: {
            username: formStore.formData.email,
            password: formStore.formData.password,
          } })

          loginCustomer({ email: formStore.formData.email, password: formStore.formData.password })
            .then((res) => {
              if (res.statusCode === 200) {
                void fetchMe().then((res) => {
                  if (res.statusCode === 200) {
                    customerStore.setCustomer(res.body)
                  }
                })
                customerStore.setIsAuth(true)
                navigate('/')
              }
            })
            .catch((res) => {
              if (isNonNullable(res) && isType<ErrorResponse>(res)) {
                showErrorNotify('Incorrect login or password')
              }
            })
            .finally(() => {
              globalStore.setLoading(false)
            })
        }
      }).catch(() => {
        showErrorNotify('Incorrect login or password')
        globalStore.setLoading(false)
      })
    }
    catch (error) {
      globalStore.setLoading(false)

      if (isNonNullable(error) && isType<ErrorResponse>(error) && isNonNullable(error.message)) {
        showErrorNotify(error.message)
        return
      }
      if (error instanceof Error) {
        showErrorNotify(error.message)
      }
    }
  }

  return (
    <>
      <Steps
        style={{ marginBottom: '2rem' }}
        labelPlacement="horizontal"
        current={currentStep}
        items={items}
      />
      <RegisterFormProvider form={form}>
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
      </RegisterFormProvider>

      <StepControls
        onFinish={handleFinish}
        onPrev={handlePrev}
        onNext={handleNext}
        currentStep={currentStep}
      />
    </>
  )
})
