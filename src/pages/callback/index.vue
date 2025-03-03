<script setup lang="ts">
import dayjs from 'dayjs'
definePage({
  redirect: {
    name: '/callback/[time]',
    params: { time: dayjs().unix() },
  },
})
</script>
