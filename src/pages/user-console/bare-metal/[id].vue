<template>
  <div>bare metal: {{ route.params.id }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

definePage({
  meta: {
    hideSidebar: true,
  },
})
const route = useRoute('/user-console/bare-metal/[id]')
</script>
