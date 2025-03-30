<template>
  <div>
    <p>hello is redirect form callback</p>
    <p>{{ dayjs(Number(time) * 1000).format('YYYY-MM-DD HH:mm:ss') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import dayjs from 'dayjs'

const route = useRoute('/callback/[time]')

const time = route.params.time
</script>
