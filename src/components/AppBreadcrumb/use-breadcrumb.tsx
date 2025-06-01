import { HomeOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { categoryStore } from '@/entities/category/model/category.store'

interface CustomBreadcrumbItem {
  key: string
  href?: string
  title: React.ReactNode
}

export function useBreadcrumb() {
  const params = useParams()
  const [breadcrumbItems, setBreadcrumbItems] = useState<CustomBreadcrumbItem[]>([])

  useEffect(() => {
    const baseItems: CustomBreadcrumbItem[] = [
      {
        key: 'home',
        href: '/',
        title: (
          <>
            <HomeOutlined />
            <span>Home</span>
          </>
        ),
      },
      params.categorySlug !== undefined
        ? { key: 'catalog', href: '/catalog/1', title: 'Catalog' }
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
