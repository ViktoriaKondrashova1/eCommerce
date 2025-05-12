import { theme } from '@/shared/configs/theme'
import { App as AntApp, ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './shared/configs/router.tsx'

function App() {
  return (
    <AntApp>
      <ConfigProvider theme={theme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </AntApp>
  )
}

export default App
