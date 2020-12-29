<template>
  <div
    class="nav fixed left-0 text-white bg-opacity-50 z-50 bg-gradient-to-r from-transBlack to-transparent min-h-screen w-52 flex flex-col items-center justify-center"
  >
    <router-link to="/" class="p-2">
      <span class="text-2xl text-white">Home</span>
    </router-link>

    <router-link to="/gallery" class="p-2">
      <span class="text-2xl text-white">Gallery</span>
    </router-link>

    <router-link to="/albums" class="p-2">
      <span class="text-2xl text-white">Albums</span>
    </router-link>

    <router-link to="/about" class="p-2">
      <span class="text-2xl text-white">About</span>
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
