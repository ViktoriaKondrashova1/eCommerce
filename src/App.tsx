import { AppButton } from '@/components/AppButton/AppButton'
import { theme } from '@/shared/configs/theme'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <AppButton type="primary">Primary Button</AppButton>
      {' '}
    </ConfigProvider>
  )
}

export default App
