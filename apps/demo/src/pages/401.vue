<template>
  <main
    class="relative mx-auto flex max-w-screen-lg flex-col items-center justify-center p-6 text-3xl"
  >
    <div class="chat chat-start">
      <div class="avatar chat-image">
        <div>
          <router-link :to="{ name: '/(home)/' }">
            <img
              src="https://pansci.asia/wp-content/uploads/2016/11/f4ba5977f2f0519a10c9f9bd66cefc89-560x576.png"
              alt="pokemon"
            />
          </router-link>
        </div>
      </div>
      <div class="chat-bubble">
        <p>Permission denied!</p>
        <p>You are not an owner!</p>
        <p>Click me to go back to home!</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
definePage({
  meta: {
    layouts: ['empty'],
  },
})
</script>
