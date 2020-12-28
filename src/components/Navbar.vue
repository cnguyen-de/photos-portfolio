<template>
  <div
    class="nav absolute top-0 text-white bg-opacity-50 z-50 bg-gradient-to-b from-transBlack to-transparent w-screen h-16 flex flex-row items-center justify-center"
  >
    <router-link to="/" class="p-2">
      <span class="text-2xl text-blue-300">Home</span>
    </router-link>

    <router-link to="/gallery" class="p-2">
      <span class="text-2xl text-blue-300">Gallery</span>
    </router-link>

    <router-link to="/about" class="p-2">
      <span class="text-2xl text-blue-300">About</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Navbar extends Vue {
  msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav {
  &__link {
    @apply text-2xl;
  }
}
</style>
