import { makeAutoObservable } from 'mobx'

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
