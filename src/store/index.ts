import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('main', () => {
  const isAdmin = ref(false)

  const setIsAdmin = (value: boolean) => {
    isAdmin.value = value
  }

  return {
    isAdmin,
    setIsAdmin,
  }
})

export const useStoreRefs = () => storeToRefs(useStore())
