import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

import { useReactStore, type ReactStore } from '@apps/demo-react/stores'
import { unstable_batchedUpdates } from 'react-dom'

type SetFrameworkPayload = Parameters<ReactStore['setFramework']>[0]

export const useFrameworkStore = defineStore('framework', () => {
  const framework = ref(useReactStore.getState().framework)
  const setFramework = (payload: SetFrameworkPayload) => {
    unstable_batchedUpdates(() => {
      useReactStore.setState({ framework: payload })
    })
  }

  useReactStore.subscribe(() => {
    framework.value = useReactStore.getState().framework
  })

  return {
    framework,
    setFramework,
  }
})

export const useFrameworkStoreRefs = () => storeToRefs(useFrameworkStore())
