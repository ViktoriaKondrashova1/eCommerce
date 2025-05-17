import { message } from 'antd'

export function useRegistrationMessage() {
  const [messageApi, contextHolder] = message.useMessage()

  const showRegistrationSucces = (): void => {
    messageApi.open({
      type: 'success',
      content: 'You registered successfully!',
    })
  }

  const showStepSuccess = (): void => {
    messageApi.open({
      type: 'success',
      content: 'Step completed!',
    })
  }

  const showErrorMessage = (msg?: string): void => {
    messageApi.open({
      type: 'error',
      content: msg ?? 'Fill in all required fields correctly',
    })
  }

  return { contextHolder, showRegistrationSucces, showStepSuccess, showErrorMessage }
}
