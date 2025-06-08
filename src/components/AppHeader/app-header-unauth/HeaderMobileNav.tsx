import type { MenuItem } from '@/components/AppHeader/types'
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Divider, Drawer, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/components/AppButton'
import { HeaderMenu } from '@/components/AppHeader/HeaderMenu/HeaderMenu'
import { cartStore } from '@/entities/cart/model/cart.store.ts'
import { ROUTES } from '@/shared/constants'

export const HeaderMobileNav = observer(() => {
  const menuItems: MenuItem[] = [
    { key: ROUTES.main, label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: ROUTES.catalog.default, label: 'CATALOG' },
  ]

  const navigate = useNavigate()
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

  const handleClickCart = () => {
    navigate(ROUTES.cart)
    onClose()
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
          <AppButton color="default" variant="text" icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />} onClick={handleClickCart}>
            <Badge showZero size="small" count={cartStore.cart?.totalLineItemQuantity ?? 0} />
          </AppButton>

          <Divider />
          <HeaderMenu items={authItems} align="column" itemStyles={{ minWidth: '100%' }} onItemClick={onClose} />
        </Flex>
      </Drawer>
    </Flex>
  )
})
