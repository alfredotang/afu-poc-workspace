import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

export const useHelloStore = defineStore('hello', () => {
  const name = ref('hello')
  const setName = (newName: string) => {
    name.value = newName
  }

  return {
    name,
    setName,
  }
})

export const useHelloStoreRefs = () => storeToRefs(useHelloStore())
