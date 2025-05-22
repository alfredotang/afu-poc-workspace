import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'

type HelloState = 'this is defined in vue' | 'react'

export const useHelloStore = defineStore('hello', () => {
  const hello = ref<HelloState>('this is defined in vue')

  const setHello = (newHello: HelloState) => {
    hello.value = newHello
  }

  return {
    hello,
    setHello,
  }
})

export const useHelloStoreRefs = () => storeToRefs(useHelloStore())
