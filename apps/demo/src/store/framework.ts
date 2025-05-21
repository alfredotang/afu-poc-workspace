import { defineStore, storeToRefs } from 'pinia'

import { useFrameworkStore as useReactFrameworkStore } from '@apps/demo-react/stores'
import { createVueStoreBridge } from '@libs/helpers/bridges'

export const useFrameworkStore = defineStore('framework', () =>
  createVueStoreBridge(useReactFrameworkStore)
)

export const useFrameworkStoreRefs = () => storeToRefs(useFrameworkStore())
