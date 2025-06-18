import { App as AntApp, ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { PageLoader } from '@/components/PageLoader/PageLoader.tsx'
import { theme } from '@/shared/configs/theme'
import { useInitApp } from '@/shared/hooks/use-init-app.ts'
import { useNetworkConnection } from '@/shared/hooks/use-network-connect.ts'
import { router } from './shared/configs/router.tsx'

function App() {
  const isPageInit = useInitApp()
  useNetworkConnection()

  return (
    <AntApp>
      <ConfigProvider theme={theme}>
        {isPageInit ? <RouterProvider router={router} /> : <PageLoader />}
      </ConfigProvider>
    </AntApp>
  )
}

export default App
