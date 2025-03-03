<template>
  <button
    :class="cn('btn btn-primary', isAdmin ? '' : 'btn-outline')"
    @click="setIsAdmin(!isAdmin)"
  >
    {{ isAdmin ? 'Admin' : 'Not Admin' }}
  </button>
</template>
<script setup lang="ts">
import { useStoreRefs, useStore } from '@/store'
import { cn } from '@/libs/class-name'

const { isAdmin } = useStoreRefs()
const { setIsAdmin } = useStore()
</script>
