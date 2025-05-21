import type { StoreDefinition } from 'pinia'

import camelCase from 'lodash/camelCase'
import { create } from 'zustand'

export function createReactStoreBridge<T extends StoreDefinition>(
  usePiniaStore: T
) {
  const pinStore = usePiniaStore()

  const store = create<ReturnType<T>>(() => pinStore as any)

  pinStore.$onAction(({ name, args }) => {
    const stateName = camelCase(name.replace('set', ''))

    store.setState(state => {
      return { ...state, [stateName]: args[0] }
    })
  })

  return store
}
