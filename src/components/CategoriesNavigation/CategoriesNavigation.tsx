import type { Category } from '@commercetools/platform-sdk'
import type { RadioChangeEvent } from 'antd'
import type { FC } from 'react'
import type { BaseComponent } from '@/shared/types/common.types'
import { Drawer, Flex, Grid, Radio } from 'antd'
import './CategoriesNavigation.scss'

interface Props extends BaseComponent {
  categories: Category[]
  selectedCategory: Category | undefined
  onChange: (e: RadioChangeEvent) => void
  categoriesDrawerVisible: boolean
  setCategoriesDrawerVisible: (value: boolean) => void
}

const { useBreakpoint } = Grid

export const CategoriesNavigation: FC<Props> = ({ testId = 'categories-navigation', categories, selectedCategory, onChange, categoriesDrawerVisible, setCategoriesDrawerVisible }) => {
  const screens = useBreakpoint()

  const categoryOptions = categories.map(category => ({
    label: category.name['en-US'],
    value: category.slug['en-US'],
  }))

  const catalogNavigationContent = (
    <Flex data-testid={testId} justify="center" style={{ marginTop: 40 }}>
      <Radio.Group
        block
        options={categoryOptions}
        optionType="button"
        buttonStyle="solid"
        onChange={onChange}
        value={selectedCategory?.slug['en-US']}
        className="categories-group"
        style={
          !screens.md
            ? {
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }
            : undefined
        }
      />
    </Flex>
  )

  return (
    <>
      {screens.md
        ? (
            catalogNavigationContent
          )
        : (
            <Drawer
              title="Categories"
              placement="right"
              onClose={() => setCategoriesDrawerVisible(false)}
              open={categoriesDrawerVisible}
              width={200}
            >
              {catalogNavigationContent}
            </Drawer>
          )}
    </>
  )
}
