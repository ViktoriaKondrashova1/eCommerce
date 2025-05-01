import type { FC } from 'react'
import { Flex, Layout, List, Menu, Typography } from 'antd'
import {theme} from "@/shared/configs/theme"
import { appName } from '@/shared/constants'
import { AppTitle } from '../AppTitle/AppTitle'
import { ItemType } from 'antd/es/menu/interface'
import { useNavigate } from 'react-router-dom'
import "./AppFooter.scss"

const { Footer } = Layout
const { Link } = Typography

export const AppFooter: FC = () => {
  const navigate = useNavigate()

  const menuItems: ItemType[] = [
    { key: '/', label: 'MAIN' },
    { key: '/about', label: 'ABOUT' },
    { key: '/catalog', label: 'CATALOG' },
    { key: '/cart', label: 'CART' },
  ]

  const developers = [
    {name: 'lnrzhkv', link: "https://github.com/lnrzhkv"}, 
    {name: 'EvgenKham', link: "https://github.com/EvgenKham"}, 
    {name: 'ViktoriaKondrashova1', link: "https://github.com/ViktoriaKondrashova1"}
  ]

  const handleMenuClick = (info: { key: string }): void => {
    navigate(info.key)
  }
    
  return (
    <Footer className="footer" style={{ background: theme.token.colorPrimary }}>
      <Flex justify="space-between">
        <Flex justify="space-between" gap="100px">
          <AppTitle level={3}>{appName}</AppTitle>
          <Menu
            items={menuItems}
            theme="dark"
            onClick={handleMenuClick}
          />
        </Flex>
        <List
          header={<AppTitle level={4}>Developers:</AppTitle>}
          dataSource={developers}
          renderItem={(item) => (
            <List.Item>
              <Link href={item.link} target='_blanc'>{item.name}</Link>
            </List.Item>
          )}
        />
      </Flex>
    </Footer>
  )
}
