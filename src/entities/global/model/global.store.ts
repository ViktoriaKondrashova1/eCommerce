import { makeAutoObservable } from 'mobx'

/**
 * глобальный стор:
 * 1. isLoading - состояние загрузки
 * 2. makeAutoObservable - следим за изменениями загрузки
 * 3. setLoading - устанавливаем новое состояние загрузки
 */
class GlobalStore {
  isLoading: boolean
  constructor() {
    this.isLoading = false

    makeAutoObservable(this)
  }

  setLoading(state: boolean) {
    this.isLoading = state
  }
}

export const globalStore = new GlobalStore()
