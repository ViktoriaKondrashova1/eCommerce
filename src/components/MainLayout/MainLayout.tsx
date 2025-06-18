import type { FC } from 'react'
import { Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { AppHeaderAuth, AppHeaderUnAuth } from '@/components/AppHeader'
import { PageLoader } from '@/components/PageLoader/PageLoader'
import { customerStore } from '@/entities/customer/model/customer.store'
import { globalStore } from '@/entities/global/model/global.store'
import { AppFooter } from '../AppFooter/AppFooter'

const { Content } = Layout

export const MainLayout: FC = observer(() => {
  const isAuth = customerStore.isAuth
  const Header = isAuth ? <AppHeaderAuth /> : <AppHeaderUnAuth />

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {globalStore.isLoading && <PageLoader />}
      {Header}
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
