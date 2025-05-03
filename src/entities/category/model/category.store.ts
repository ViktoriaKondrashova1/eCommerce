import type { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'

class CategoryStore {
  categories: CategoryPagedQueryResponse['results'] | []
  constructor() {
    this.categories = []

    makeAutoObservable(this)
  }

  setCategories(data: CategoryPagedQueryResponse['results']): void {
    this.categories = structuredClone(data)
  }

  getCategoryById(id: string): Category | null {
    const foundCategory = this.categories.find(category => category.id === id)

    return foundCategory !== undefined ? foundCategory : null
  }

  getCategoryNameById(id: string): string | null {
    const foundCategory = this.getCategoryById(id)

    return foundCategory !== undefined && foundCategory?.name ? foundCategory?.name['en-US'] : null
  }

  getCategorySlugById(id: string): string | null {
    const foundCategory = this.getCategoryById(id)

    return foundCategory !== undefined && foundCategory?.slug ? foundCategory?.slug['en-US'] : null
  }
}

export const categoryStore = new CategoryStore()
