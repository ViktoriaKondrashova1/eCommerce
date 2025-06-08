import type { MenuItem } from '@/components/AppHeader/types'
import { MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Divider, Drawer, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/components/AppButton'
import { HeaderMenu } from '@/components/AppHeader/HeaderMenu/HeaderMenu'
import { cartStore } from '@/entities/cart/model/cart.store.ts'
import { customerStore } from '@/entities/customer/model/customer.store'
import { ROUTES } from '@/shared/constants'

export const HeaderMobileNav = observer(() => {
  const { firstName } = customerStore.customer || {}
  const navigate = useNavigate()

  const menuItems: MenuItem[] = [
    { key: ROUTES.main, label: 'MAIN' },
    { key: ROUTES.about, label: 'ABOUT' },
    { key: ROUTES.catalog.default, label: 'CATALOG' },
  ]

  const profileMenuItems: MenuItem[] = [
    { key: ROUTES.profile.info, label: 'PERSONAL INFO' },
    { key: ROUTES.profile.addresses, label: 'ADDRESSES' },
    { key: ROUTES.profile.security, label: 'SECURITY' },
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
        title={`Hello, ${firstName}`}
      >
        <Flex vertical>
          <HeaderMenu items={menuItems} align="column" itemStyles={{ minWidth: '100%' }} onItemClick={onClose} />

          <AppButton color="default" variant="text" icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />} onClick={handleClickCart}>
            <Badge showZero size="small" count={cartStore.cart?.totalLineItemQuantity ?? 0} />
          </AppButton>

          <Divider />

          <HeaderMenu items={profileMenuItems} align="column" itemStyles={{ minWidth: '100%' }} onItemClick={onClose} />
          <Divider />

          <Flex justify="end" align="center" gap={16}>
            <AppButton
              color="danger"
              variant="outlined"
              onClick={() => {
                customerStore.logout()
                navigate(ROUTES.main)
              }}
            >
              LOGOUT
            </AppButton>
          </Flex>

        </Flex>
      </Drawer>
    </Flex>
  )
})
