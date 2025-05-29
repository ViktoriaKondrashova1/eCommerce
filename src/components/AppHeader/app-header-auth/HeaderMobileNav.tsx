import type { MenuItem } from '@/components/AppHeader/types'
import { MenuOutlined } from '@ant-design/icons'
import { Divider, Drawer, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton'
import { HeaderMenu } from '@/components/AppHeader/HeaderMenu/HeaderMenu'
import { customerStore } from '@/entities/customer/model/customer.store'
import { ROUTES } from '@/shared/constants'

export const HeaderMobileNav = observer(() => {
  const { firstName } = customerStore.customer || {}
  const menuItems: MenuItem[] = [
    { key: ROUTES.main, label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: '/catalog', label: 'CATALOG' },
    { key: '/cart', label: 'CART' },
  ]

  const profileMenuItems: MenuItem[] = [
    { key: ROUTES.profile.info, label: 'PERSONAL INFO' },
    { key: ROUTES.profile.shipping, label: 'SHIPPING ADDRESSES' },
    { key: ROUTES.profile.billing, label: 'BILLING ADDRESSES' },
    { key: ROUTES.profile.security, label: 'SECURITY' },
  ]

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const showDrawer = () => {
    setIsDrawerOpen(true)
  }

  const onClose = () => {
    setIsDrawerOpen(false)
  }

  return (
    <Flex>

      {/* hamburger */}
      <AppButton variant="text" color="default" icon={<MenuOutlined />} onClick={showDrawer} />

      {/* drawer */}
      <Drawer
        onClose={onClose}
        open={isDrawerOpen}
        placement="top"
        size="large"
        title={`Hello, ${firstName}`}
      >
        <Flex vertical>
          <HeaderMenu items={menuItems} align="column" itemStyles={{ minWidth: '100%' }} onItemClick={onClose} />
          <Divider />

          <HeaderMenu items={profileMenuItems} align="column" itemStyles={{ minWidth: '100%' }} onItemClick={onClose} />
          <Divider />

          <Flex justify="end" align="center" gap={16}>
            <AppButton color="danger" variant="outlined" onClick={() => customerStore.logout()}>
              LOGOUT
            </AppButton>
          </Flex>

        </Flex>
      </Drawer>
    </Flex>
  )
})
