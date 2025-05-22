import { makeAutoObservable } from 'mobx'

class GlobalStore {
  isLoading: boolean
  constructor() {
    this.isLoading = true

    makeAutoObservable(this)
  }

  setLoading(state: boolean) {
    this.isLoading = state
  }
}

export const globalStore = new GlobalStore()
