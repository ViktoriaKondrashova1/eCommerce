import type { FC } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Flex, Input } from 'antd'
import { AppTitle } from '../AppTitle/AppTitle'
import './CatalogSearch.scss'

interface Props {
  onChange: (value: string) => void
}

export const CatalogSearch: FC<Props> = ({ onChange }) => {
  return (
    <Flex gap="small" align="center" style={{ minWidth: 'fit-content' }}>
      <AppTitle level={5} style={{ margin: '0', wordBreak: 'normal' }}>Search:</AppTitle>
      <Input.Search onChange={e => onChange(e.target.value)} suffix={<SearchOutlined />} className="search-input" />
    </Flex>
  )
}
