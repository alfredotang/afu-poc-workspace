import { useAuthStore } from '@apps/demo-react/stores'

export default function PokemonList() {
  const pokemonList = useAuthStore(state => state.pokemonList)
  const isFetchingPokemonList = useAuthStore(
    state => state.isFetchingPokemonList
  )

  if (isFetchingPokemonList) {
    return <div>Loading...</div>
  }

  if (!pokemonList?.results?.length) {
    return <div>No data</div>
  }

  return (
    <ul>
      {pokemonList.results.map(pokemon => (
        <li key={pokemon.name}>
          <a href={pokemon.url} target="_blank">
            {pokemon.name}
          </a>
        </li>
      ))}
    </ul>
  )
}
