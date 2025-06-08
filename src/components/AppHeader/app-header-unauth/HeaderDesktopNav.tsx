import type { MenuItem } from '@/components/AppHeader/types'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Flex } from 'antd'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { AppButton } from '@/components/AppButton'
import { HeaderMenu } from '@/components/AppHeader/HeaderMenu/HeaderMenu'
import { cartStore } from '@/entities/cart/model/cart.store.ts'
import { ROUTES } from '@/shared/constants.ts'

export const HeaderDesktopNav = observer(() => {
  const navigate = useNavigate()

  const menuItems: MenuItem[] = [
    { key: ROUTES.main, label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: ROUTES.catalog.default, label: 'CATALOG' },
    { key: '/login', label: 'LOG IN', color: 'primary' },
    { key: '/register', label: 'SIGN UP', color: 'primary' },
  ]

  return (
    <Flex>
      <HeaderMenu items={menuItems} />
      <Badge showZero size="small" count={cartStore.cart?.totalLineItemQuantity ?? 0}>
        <AppButton color="default" variant="filled" icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />} onClick={() => navigate(ROUTES.cart)} />
      </Badge>
    </Flex>
  )
})
