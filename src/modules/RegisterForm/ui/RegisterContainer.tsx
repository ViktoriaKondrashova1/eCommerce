import type { ErrorResponse } from '@commercetools/platform-sdk'
import { fetchMe } from '@/entities/customer/api/fetch-me.ts'
import { loginCustomer } from '@/entities/customer/api/sign-in.ts'
import { customerStore } from '@/entities/customer/model/customer.store.ts'
import { globalStore } from '@/entities/global/model/global.store.ts'
import { formStore } from '@/modules/RegisterForm/model/form-store.ts'
import { RegisterFormProvider } from '@/modules/RegisterForm/model/registration-form-context.tsx'
import { mobileTitleConstructor } from '@/modules/RegisterForm/ui/register-mobile-title/constructor.ts'
import { MobileTitle } from '@/modules/RegisterForm/ui/register-mobile-title/register-mobile-title.tsx'
import { StepControls } from '@/modules/RegisterForm/ui/steps/StepConstrols.tsx'
import { useSteps } from '@/modules/RegisterForm/ui/use-steps.ts'
import { setCommerceApiFlow } from '@/shared/configs/commerce-client'
import { ROUTES } from '@/shared/constants.ts'
import { useNotify } from '@/shared/hooks/use-notify.tsx'
import { isNonNullable } from '@/shared/types/is-non-nullable.ts'
import { isType } from '@/shared/types/is-type.ts'
import { Flex, Form, Grid, Steps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

const { useBreakpoint } = Grid

export const RegisterContainer = observer(() => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const screens = useBreakpoint()

  const { showErrorNotify, showSuccessNotify } = useNotify()
  const { currentStep, steps, moveNext, movePrev } = useSteps()

  const items = steps.map(item => ({ key: item.title, title: item.title }))
  const StepContent = steps[currentStep].content

  const handleNext = async () => {
    await form.validateFields()
    moveNext()
  }

  const handlePrev = async () => {
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
                formStore.resetForm()
                showSuccessNotify('Successfully registered')
                navigate(ROUTES.main)
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
      <Flex style={{ marginBottom: screens.xs ? '1rem' : '2rem' }} vertical align="center" justify="center">

        {screens.xs
          ? (
              <MobileTitle
                title={mobileTitleConstructor?.[currentStep].title}
                description={mobileTitleConstructor?.[currentStep].description}
              />
            )
          : (
              <Steps
                style={{ maxWidth: '800px' }}
                labelPlacement="horizontal"
                current={currentStep}
                items={items}
              />
            )}

      </Flex>

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
