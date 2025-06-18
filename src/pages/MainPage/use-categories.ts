import { useEffect } from 'react'
import { getAllCategories } from '@/entities/category/api/get-all-categories.ts'
import { categoryStore } from '@/entities/category/model/category.store.ts'

export function useCategories() {
  useEffect(() => {
    getAllCategories()
      .then(response => categoryStore.setCategories(response.body.results))
      .catch(() => console.error('categories fetch error:'))
  }, [])
}
