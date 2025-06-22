<template>
  <Select
    v-model="model"
    class="w-fit"
    :options="timeZoneOptions"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(timezone)

const model = defineModel<string>()

const timeZoneOptions = computed(() =>
  Intl.supportedValuesOf('timeZone').map(name => ({
    label: `${name} (${dayjs().tz(name).format('Z')})`,
    value: name,
  }))
)
</script>
