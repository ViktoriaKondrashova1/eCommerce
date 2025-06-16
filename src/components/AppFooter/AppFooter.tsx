import type { BaseComponent } from '@/shared/types/common.types.ts'
import type { ItemType } from 'antd/es/menu/interface'
import type { FC } from 'react'
import { theme } from '@/shared/configs/theme.ts'
import { appName } from '@/shared/constants.ts'
import { Flex, Grid, Layout, List, Menu, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { AppTitle } from '../AppTitle/AppTitle'
import './AppFooter.scss'

interface Props extends BaseComponent {}

const { Footer } = Layout
const { Link } = Typography
const { useBreakpoint } = Grid

export const AppFooter: FC<Props> = ({ testId = 'footer', ...rest }) => {
  const navigate = useNavigate()
  const screens = useBreakpoint()

  const menuItems: ItemType[] = [
    { key: '/', label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: '/catalog/1', label: 'CATALOG' },
    { key: '/cart', label: 'CART' },
  ]

  const developers = [
    { name: 'lnrzhkv', link: 'https://github.com/lnrzhkv' },
    { name: 'EvgenKham', link: 'https://github.com/EvgenKham' },
    { name: 'ViktoriaKondrashova1', link: 'https://github.com/ViktoriaKondrashova1' },
  ]

  const responsiveMenuItems: ItemType[] = !screens.md
    ? [
        {
          key: 'menu',
          label: 'Menu',
          children: menuItems,
        },
      ]
    : menuItems

  const handleMenuClick = (info: { key: string }): void => {
    navigate(info.key)
  }

  return (
    <Footer data-testid={testId} {...rest} className="footer" style={{ background: theme.token.colorPrimary }}>
      <Flex justify="space-between">
        <Flex justify="space-between" gap="100px">
          {screens.md && <AppTitle level={3}>{appName}</AppTitle>}
          <Menu
            items={responsiveMenuItems}
            theme="dark"
            onClick={handleMenuClick}
          />
        </Flex>
        <List
          header={<AppTitle level={4}>Developers:</AppTitle>}
          dataSource={developers}
          renderItem={item => (
            <List.Item>
              <Link href={item.link} target="_blank">{item.name}</Link>
            </List.Item>
          )}
        />
      </Flex>
    </Footer>
  )
}
