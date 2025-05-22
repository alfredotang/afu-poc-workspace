import { useAuthStore as useVueAuthStore } from '@apps/demo/store/auth'
import { useHelloStore as useVueHelloStore } from '@apps/demo/store/hello'
import { createReactStoreBridge } from '@libs/helpers/bridges'
import { create } from 'zustand'

export type ReactStore = {
  framework: 'vue' | 'This is defined in react'
  setFramework: (framework: 'vue' | 'This is defined in react') => void
}

export const useAuthStore = createReactStoreBridge(useVueAuthStore)

export const useFrameworkStore = create<ReactStore>(set => ({
  framework: 'This is defined in react',
  setFramework: framework => {
    set({ framework })
  },
}))

export const useHelloStore = createReactStoreBridge(useVueHelloStore)
