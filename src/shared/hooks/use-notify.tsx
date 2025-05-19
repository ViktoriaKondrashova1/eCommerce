import { ExclamationCircleOutlined } from '@ant-design/icons'
import { notification } from 'antd'

export function useNotify() {
  notification.config({
    bottom: 240,
    duration: 2,
    placement: 'bottomRight',
    pauseOnHover: true,
  })

  const showErrorNotify = (msg?: string): void => {
    notification.open({
      type: 'error',
      message: msg,
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
    })
  }

  const showSuccessNotify = (msg?: string): void => {
    notification.open({
      type: 'success',
      message: msg,
      icon: <ExclamationCircleOutlined style={{ color: '#52c41a' }} />,
    })
  }

  const showInfoNotify = (msg?: string): void => {
    notification.open({
      type: 'info',
      message: msg,
      icon: <ExclamationCircleOutlined style={{ color: '#1890ff' }} />,
    })
  }
  const showWarningNotify = (msg?: string): void => {
    notification.open({
      type: 'warning',
      message: msg,
      icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    })
  }

  return { showErrorNotify, showSuccessNotify, showInfoNotify, showWarningNotify }
}
