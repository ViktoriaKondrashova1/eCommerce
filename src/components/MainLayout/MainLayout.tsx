import type { FC } from 'react'
import { AppButton } from '@/components/AppButton'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { AppFooter } from '../AppFooter/AppFooter'
import { AppHeader } from '../AppHeader/AppHeader'

const { Content } = Layout

export const MainLayout: FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader></AppHeader>
      <Content>
        <AppButton>Button</AppButton>
        <Outlet />
      </Content>
      <AppFooter></AppFooter>
    </Layout>
  )
}
