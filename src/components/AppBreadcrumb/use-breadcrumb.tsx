import type { CustomBreadcrumbItem } from './AppBreadcrumb'
import { HomeOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categoryStore } from '@/entities/category/model/category.store'

export function useBreadcrumb() {
  const params = useParams()
  const [breadcrumbItems, setBreadcrumbItems] = useState<CustomBreadcrumbItem[]>([])

  useEffect(() => {
    const baseItems: CustomBreadcrumbItem[] = [
      {
        key: 'home',
        title: (
          <Link to="/">
            <HomeOutlined />
            <span>Home</span>
          </Link>
        ),
      },
      params.categorySlug !== undefined
        ? { key: 'catalog', title: <Link to="/catalog/1">Catalog</Link> }
        : { key: 'catalog', title: 'Catalog' },
    ]

    if (params.categorySlug !== undefined) {
      const checkCategory = () => {
        const category = categoryStore.getCategoryBySlug(params.categorySlug!)

        if (category) {
          setBreadcrumbItems([
            ...baseItems,
            { key: 'category', title: category.name['en-US'] },
          ])
        }
        else {
          setTimeout(checkCategory, 100)
        }
      }

      checkCategory()
    }
    else {
      setBreadcrumbItems(baseItems)
    }
  }, [params])

  return { breadcrumbItems }
}
