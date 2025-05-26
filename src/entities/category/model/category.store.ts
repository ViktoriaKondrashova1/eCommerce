import type { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk'
import { makeAutoObservable } from 'mobx'

/**
 * стор категорий:
 * 1. this.categories - список категорий, по дефолту пустой массив
 * 2. подключаем моб икс и используем makeAutoObservable для того,
 * чтобы список категорий сам обновлялся при каких-либо изменениях
 * 3. setCategories - обновляем список категорий, создаем его копию
 * 4. getCategoryById - поиск категории по айдишнику
 * 5. getCategoryNameById - получаем название категории по айдишнику
 * 6. getCategorySlugById - получаем URL-slug категории
 */
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

  getCategoryByName(name: string): Category | null {
    const foundCategory = this.categories.find(category => category.name['en-US'] === name)

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
