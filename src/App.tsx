import { theme } from '@/shared/configs/theme'
import { Button, ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Button type="primary">Primary Button</Button>
      {' '}
    </ConfigProvider>
  )
}

export default App
