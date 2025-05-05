import type { FC } from 'react'
import { App as AntApp, Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { AppFooter } from '../AppFooter/AppFooter'
import { AppHeader } from '../AppHeader/AppHeader'

const { Content } = Layout

export const MainLayout: FC = () => {
  return (
    <AntApp>
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader></AppHeader>
        <Content style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
        >
          <Outlet />
        </Content>
        <AppFooter></AppFooter>
      </Layout>
    </AntApp>

  )
}
