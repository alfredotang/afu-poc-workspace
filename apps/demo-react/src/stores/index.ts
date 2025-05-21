import { useStore as useVueStore } from '@apps/demo/store'
import { useHelloStore as useVueHelloStore } from '@apps/demo/store/hello'
import { createReactStoreBridge } from '@libs/helpers/bridges'
import { create } from 'zustand'

export type ReactStore = {
  framework: 'react' | 'vue'
  setFramework: (framework: 'react' | 'vue') => void
}

export const useAuthStore = create<ReturnType<typeof useVueStore>>(() =>
  useVueStore()
)

export const useFrameworkStore = create<ReactStore>(set => ({
  framework: 'react',
  setFramework: framework => {
    set({ framework })
  },
}))

export const useHelloStore = createReactStoreBridge(useVueHelloStore)
