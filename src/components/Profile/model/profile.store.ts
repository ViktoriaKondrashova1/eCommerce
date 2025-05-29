import type { Profile } from '@/components/Profile/model/types.ts'
import { makeAutoObservable } from 'mobx'

class ProfileStore {
  public profile: Profile | null

  constructor() {
    makeAutoObservable(this)
    this.profile = null
  }

  setProfile(data: Profile): void {
    this.profile = structuredClone(data)
  }
}

export const profileStore = new ProfileStore()
