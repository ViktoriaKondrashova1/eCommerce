import type { Category } from '@commercetools/platform-sdk'
import type { RadioChangeEvent } from 'antd'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Flex, Radio } from 'antd'
import './CategoriesNavigation.scss'

interface Props extends BaseComponent {
  categories: Category[]
  selectedCategory: Category | undefined
  onChange: (e: RadioChangeEvent) => void
}

export const CategoriesNavigation: FC<Props> = ({ testId = 'categories-navigation', categories, selectedCategory, onChange }) => {
  const categoryOptions = categories.map(category => ({
    label: category.name['en-US'],
    value: category.slug['en-US'],
  }))

  return (
    <Flex data-testid={testId} justify="center" style={{ marginTop: 40 }}>
      <Radio.Group
        block
        options={categoryOptions}
        optionType="button"
        buttonStyle="solid"
        onChange={onChange}
        value={selectedCategory?.slug['en-US']}
        className="categories-group"
      />
    </Flex>
  )
}
