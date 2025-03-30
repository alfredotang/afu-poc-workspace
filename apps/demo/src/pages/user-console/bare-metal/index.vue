<template>
  <div>bare-metal</div>
  <div class="flex gap-6">
    <router-link :to="{ name: '/user-console/bare-metal/create/' }">
      <button class="btn btn-primary">Create</button>
    </router-link>
    <router-link
      :to="{ name: '/user-console/bare-metal/[id]', params: { id: '1' } }"
    >
      <button class="btn btn-secondary">View bare metal 1</button>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>
