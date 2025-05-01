import type { BaseComponent } from '@/shared/types/common.types'
import type { FC } from 'react'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ItemType } from 'antd/es/menu/interface'

interface Props extends BaseComponent {
    items: ItemType[]
}

export const AppHeaderMenu: FC<Props> = ({ testId = 'header-menu', ...rest }) => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const handleMenuClick = (info: { key: string }): void => {
      navigate(info.key)
    }

    return (
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        style={{ background: 'inherit', whiteSpace: 'nowrap', borderBottom: 'none'}}
        {...rest}
      />
    )
}