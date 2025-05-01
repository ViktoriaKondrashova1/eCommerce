import type { FC } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { AppFooter } from '../AppFooter/AppFooter'
import { AppHeader } from '../AppHeader/AppHeader'

const { Content } = Layout

export const MainLayout: FC = () => {
  return (
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
  )
}
