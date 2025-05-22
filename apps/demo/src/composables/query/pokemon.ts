import { useQuery } from '@tanstack/vue-query'
import axios from 'axios'

export type PokemonListResponse = {
  count: number
  next: string
  previous: string
  results: PokemonResultResponse[]
}

export type PokemonResultResponse = {
  name: string
  url: string
}

export const useGetPokemonListQuery = () => {
  return useQuery({
    queryKey: ['pokemon'],
    queryFn: () =>
      axios
        .get<PokemonListResponse>('https://pokeapi.co/api/v2/pokemon')
        .then(res => res.data),
  })
}
