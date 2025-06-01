import type { Category } from '@commercetools/platform-sdk'
import type { RadioChangeEvent } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllCategories } from '@/entities/category/api/get-all-categories'
import { useNotify } from '@/shared/hooks/use-notify'

export function useCategoriesNav() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const { showErrorNotify } = useNotify()

  useEffect(() => {
    if (params.categorySlug !== undefined && categories.length > 0) {
      const category = categories.find(c => c.slug['en-US'] === params.categorySlug)
      setSelectedCategory(category)
    }
  }, [params.categorySlug, categories])

  useEffect(() => {
    if (location.pathname === '/catalog/1' || location.pathname === '/catalog/2') {
      setSelectedCategory(undefined)
    }
  }, [location.pathname])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data.body.results)
      }
      catch {
        showErrorNotify('Failed to load categories')
      }
    }

    void loadCategories()
  }, [])

  const handleCategoryChange = (e: RadioChangeEvent): void => {
    const category = categories.find(c => c.slug['en-US'] === e.target.value)
    setSelectedCategory(category)
    navigate(`/catalog/category/${category?.slug['en-US']}`)
  }

  const resetCategory = () => {
    setSelectedCategory(undefined)
    navigate('/catalog/1')
  }

  return { categories, selectedCategory, handleCategoryChange, resetCategory }
}
