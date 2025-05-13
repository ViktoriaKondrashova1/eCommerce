import type { BaseComponent } from '@/shared/types/common.types'
import type { MenuProps } from 'antd'
import type { FC } from 'react'
import { Flex } from 'antd'
import { AbvFilter } from '../AbvFilter/AbvFilter'
import { AppButton } from '../AppButton'
import { Backdrop } from '../Backdrop/Backdrop'
import { PriceRangeFilter } from '../PriceRangeFilter/PriceRangeFilter'
import { SortingMenu } from '../SortingMenu/SortingMenu'

type MenuItem = Required<MenuProps>['items'][number]

const styles = ['Lager', 'IPA', 'Gose', 'Pale Ale', 'Stout', 'Pilsner', 'Red Ale', 'Sour'] // взять данные из коммерс тулз
const breweries = ['Lager', 'IPA', 'Gose', 'Pale Ale', 'Stout', 'Pilsner', 'Red Ale', 'Sour'] // взять данные из коммерс тулз
const countries = ['United States', 'Belgium', 'Germany', 'Italy', 'Spain'] // взять данные из коммерс тулз

const sortByPriceItems: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Sorting',
    children: [
      { key: '1', label: 'Price: high - low' },
      { key: '2', label: 'Price: low - high' },
    ],
  },
]

const sortByStyleItems: MenuItem[] = [
  {
    key: 'sub2',
    label: 'Style',
    children: styles.map((style, idx) => ({ key: idx.toString(), label: style })),
  },
]

const sortByBreweryItems: MenuItem[] = [
  {
    key: 'sub3',
    label: 'Brewery',
    children: breweries.map((brewery, idx) => ({ key: idx.toString(), label: brewery })),
  },
]

const sortByCountryItems: MenuItem[] = [
  {
    key: 'sub4',
    label: 'Country',
    children: countries.map((country, idx) => ({ key: idx.toString(), label: country })),
  },
]

export const CatalogSidebar: FC<BaseComponent> = ({ testId = 'catalog-sidebar' }) => {
  return (
    <Backdrop>
      <Flex vertical data-testid={testId} style={{ width: 200 }}>
        <SortingMenu items={sortByPriceItems} />
        <SortingMenu items={sortByStyleItems} />
        <SortingMenu items={sortByBreweryItems} />
        <SortingMenu items={sortByCountryItems} />
        <PriceRangeFilter />
        <AbvFilter />
        <Flex vertical gap="small">
          <AppButton type="primary">Accept</AppButton>
          <AppButton type="primary">Reset</AppButton>
        </Flex>
      </Flex>
    </Backdrop>
  )
}
