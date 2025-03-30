<template>{{ id }}</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute('/about/[id]/')

const id = route.params.id
</script>
