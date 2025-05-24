import type { MenuItem } from '@/components/AppHeader/types'
import { MenuOutlined } from '@ant-design/icons'
import { Divider, Drawer, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AppButton } from '@/components/AppButton'
import { HeaderMenu } from '@/components/AppHeader/HeaderMenu/HeaderMenu'
import { ROUTES } from '@/shared/constants'

export const HeaderMobileNav = observer(() => {
  const menuItems: MenuItem[] = [
    { key: ROUTES.main, label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: '/catalog', label: 'CATALOG' },
    { key: '/cart', label: 'CART' },
  ]

  const authItems: MenuItem[] = [
    { key: '/login', label: 'LOG IN' },
    { key: '/register', label: 'SIGN UP' },
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
      >
        <Flex vertical>
          <HeaderMenu items={menuItems} align="column" itemStyles={{ minWidth: '100%' }} onItemClick={onClose} />
          <Divider />
          <HeaderMenu items={authItems} align="column" itemStyles={{ minWidth: '100%' }} onItemClick={onClose} />
        </Flex>
      </Drawer>
    </Flex>
  )
})
