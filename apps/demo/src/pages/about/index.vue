<template>
  <router-link :to="{ name: '/about/[id]/', params: { id: 1 } }">
    <button class="btn btn-primary">about/1</button>
  </router-link>
</template>
