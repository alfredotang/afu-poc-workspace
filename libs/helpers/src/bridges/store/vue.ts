import { ref } from 'vue'

import camelCase from 'lodash/camelCase'
import { unstable_batchedUpdates } from 'react-dom'
import { type StoreApi, type UseBoundStore } from 'zustand'

export function createVueStoreBridge<T>(store: UseBoundStore<StoreApi<T>>): T {
  const result = {}

  for (const [key, value] of Object.entries(store.getState() as any)) {
    const isSetter = typeof value === 'function'
    result[key] = isSetter ? value : ref(value)

    if (!isSetter) {
      const setterKey = camelCase(`set-${key}`)
      result[setterKey] = (value: T[keyof T]) => {
        unstable_batchedUpdates(() => {
          store.setState({ [key]: value } as any)
        })
      }

      result[key] = ref(value)
    }
  }

  store.subscribe(state => {
    for (const key of Object.keys(result)) {
      result[key].value = state[key]
    }
  })

  return result as T
}
