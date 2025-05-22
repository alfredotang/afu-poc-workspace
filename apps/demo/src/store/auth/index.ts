import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useGetPokemonListQuery } from '@apps/demo/composables/query/pokemon'
import cookie from '@libs/helpers/cookie'
import { jwtDecode, type JwtPayload } from 'jwt-decode'

import { ACCESS_TOKEN_DICT } from './constants'

const ACCESS_TOKEN_KEY = 'at'

const getJWTPayload = (token?: string) => {
  if (!token) return null
  return jwtDecode<JwtPayload & { name: string; role: 'owner' | 'member' }>(
    token
  )
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const accessToken = ref(cookie.get(ACCESS_TOKEN_KEY))
  const isLoggedIn = ref(Boolean(accessToken.value))
  const { data: pokemonList, isFetching: isFetchingPokemonList } =
    useGetPokemonListQuery()

  const isOwner = ref(getJWTPayload(accessToken.value)?.role === 'owner')
  const userName = ref(getJWTPayload(accessToken.value)?.name || '')

  const login = (role: keyof typeof ACCESS_TOKEN_DICT) => {
    const token = ACCESS_TOKEN_DICT[role]
    const payload = jwtDecode<
      JwtPayload & { name: string; role: 'owner' | 'member' }
    >(token)
    if (!payload) return
    cookie.set(ACCESS_TOKEN_KEY, token, { expires: 365 })
    accessToken.value = token
    isOwner.value = payload.role === 'owner'
    userName.value = payload.name
    isLoggedIn.value = true
    router.push({ name: '/(home)/' })
  }

  const logout = () => {
    cookie.remove(ACCESS_TOKEN_KEY)
    accessToken.value = undefined
    isLoggedIn.value = false
    isOwner.value = false
    userName.value = ''
    router.push({ name: '/auth/signin' })
  }

  return {
    userName,
    isLoggedIn,
    isOwner,
    login,
    logout,
    pokemonList,
    isFetchingPokemonList,
  }
})

export const useAuthStoreRefs = () => storeToRefs(useAuthStore())
