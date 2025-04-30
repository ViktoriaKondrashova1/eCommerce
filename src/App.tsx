import { theme } from '@/shared/configs/theme'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './shared/configs/router.tsx'

function App() {
  return (
    <ConfigProvider theme={theme}>
      <RouterProvider router={router} />
    </ConfigProvider>

  )
}

export default App
