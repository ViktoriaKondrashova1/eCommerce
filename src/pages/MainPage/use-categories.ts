import { useEffect, useState } from 'react'
import { getAllCategories } from '@/entities/category/api/get-all-categories.ts'
import { categoryStore } from '@/entities/category/model/category.store.ts'

export function useCategories() {
  const [isInitCategories, setIsInitCategories] = useState<boolean>(false)
  useEffect(() => {
    getAllCategories()
      .then((response) => {
        categoryStore.setCategories(response.body.results)
        setIsInitCategories(true)
      })
      .catch(() => console.error('categories fetch error:'))

    return () => setIsInitCategories(false)
  }, [])

  return isInitCategories
}
