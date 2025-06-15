import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types.ts'
import { SearchOutlined } from '@ant-design/icons'
import { Flex, Input } from 'antd'
import { AppTitle } from '../../../components/AppTitle/AppTitle.tsx'
import './CatalogSearch.scss'

interface Props extends BaseComponent {
  onChange: (value: string) => void
}

export const CatalogSearch: FC<Props> = ({ testId = 'catalog-search', onChange }) => {
  return (
    <Flex data-testid={testId} gap="small" align="center" style={{ minWidth: 'fit-content' }}>
      <AppTitle level={5} style={{ margin: '0', wordBreak: 'normal' }}>Search:</AppTitle>
      <Input.Search onChange={e => onChange(e.target.value)} suffix={<SearchOutlined />} className="search-input" />
    </Flex>
  )
}
