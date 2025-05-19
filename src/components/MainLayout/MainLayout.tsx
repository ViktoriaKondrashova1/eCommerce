import type { FC } from 'react'
import { Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { PageLoader } from '@/components/PageLoader/PageLoader'
import { globalStore } from '@/entities/global/model/global.store'
import { AppFooter } from '../AppFooter/AppFooter'
import { AppHeader } from '../AppHeader/AppHeader'

const { Content } = Layout

export const MainLayout: FC = observer(() => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {globalStore.isLoading && <PageLoader />}
      <AppHeader />
      <Content style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
      >
        <Outlet />
      </Content>
      <AppFooter />
    </Layout>
  )
},
)
