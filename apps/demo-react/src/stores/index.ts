import { useStore } from '@apps/demo/store'
import { create } from 'zustand'

type AuthStore = {
  getState: () => {
    isLoggedIn: boolean
    isOwner: boolean
    userName: string
  }
  login: ReturnType<typeof useStore>['login']
  logout: () => void
}

export type ReactStore = {
  framework: 'react' | 'vue'
  setFramework: (framework: 'react' | 'vue') => void
}

export const useAuthStore = create<AuthStore>(() => ({
  getState: () => {
    const { isLoggedIn, isOwner, userName } = useStore?.() || {
      isLoggedIn: false,
      isOwner: false,
      userName: '',
    }
    return {
      isLoggedIn,
      isOwner,
      userName,
    }
  },
  login: payload => useStore().login(payload),
  logout: () => useStore().logout(),
}))

export const useReactStore = create<ReactStore>(set => ({
  framework: 'react',
  setFramework: framework => {
    set({ framework })
  },
}))
