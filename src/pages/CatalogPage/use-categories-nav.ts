import type { Category } from '@commercetools/platform-sdk'
import type { RadioChangeEvent } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAllCategories } from '@/entities/category/api/get-all-categories'

export function useCategoriesNav() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/catalog/1') {
      setSelectedCategory(undefined)
    }
  }, [location.pathname])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories()
        setCategories(data.body.results)
      }
      catch (error) {
        console.error('Failed to load categories', error)
      }
    }

    void loadCategories()
  }, [])

  const handleCategoryChange = (e: RadioChangeEvent): void => {
    const category = categories.find(c => c.slug['en-US'] === e.target.value)
    setSelectedCategory(category)
    navigate(`/catalog/${category?.slug['en-US']}`)
  }

  const resetCategory = () => {
    setSelectedCategory(undefined)
    navigate('/catalog/1')
  }

  return { categories, selectedCategory, handleCategoryChange, resetCategory }
}
