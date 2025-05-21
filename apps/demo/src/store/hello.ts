import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

export const useHelloStore = defineStore('hello', () => {
  const hello = ref('hello')
  const setHello = (newHello: string) => {
    hello.value = newHello
  }

  return {
    hello,
    setHello,
  }
})

export const useHelloStoreRefs = () => storeToRefs(useHelloStore())
