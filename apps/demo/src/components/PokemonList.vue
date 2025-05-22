<template>
  <div>
    <h1>Pokemon List</h1>
    <div v-if="isFetchingPokemonList">Loading...</div>
    <div v-else-if="!pokemonList?.results?.length">No data</div>
    <ul v-else>
      <li
        v-for="pokemon in pokemonList?.results"
        :key="pokemon.name"
      >
        <a
          :href="pokemon.url"
          target="_blank"
          class="hover:underline"
        >
          {{ pokemon.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAuthStoreRefs } from '@apps/demo/store/auth'

const { pokemonList, isFetchingPokemonList } = useAuthStoreRefs()
</script>
