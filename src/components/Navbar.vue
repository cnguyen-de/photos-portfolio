<template>
  <div class="">
    <div
      class="nav fixed left-0 text-white bg-opacity-50 z-50 bg-gradient-to-r from-transBlack to-transparent min-h-screen w-52 md:flex flex-col justify-between items-center"
      :class="{ 'hidden w-0': !isNavbarDisplayed, 'flex w-52': isNavbarDisplayed }"
    >
      <div class=" logo text-2xl text-white pt-20"><span class="hidden md:block">Bich Bui</span></div>
      <div class="nav__links flex flex-col">
        <router-link to="/" class="p-2">
          <span class="text-2xl text-white" @click="toggleNavbar()">Home</span>
        </router-link>

        <router-link to="/gallery" class="p-2">
          <span class="text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.gallery') }}</span>
        </router-link>

        <router-link to="/albums" class="p-2">
          <span class="text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.album') }}</span>
        </router-link>

        <router-link to="/about" class="p-2">
          <span class="text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.about') }}</span>
        </router-link>
      </div>
      <LanguageSwitcher class="pb-10" />
    </div>
    <div
      class="md:hidden flex fixed h-16 left-0 bg-opacity-50 z-50 bg-gradient-to-b from-transBlack to-transparent w-screen items-center justify-center"
    >
      <button
        class="nav__toggle absolute left-0 w-16 h-16 text-white outline-none focus:outline-none"
        @click="toggleNavbar()"
      >
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="ml-5 w-5 h-5"
          v-if="!isNavbarDisplayed"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 2H0V1h15v1zm0 4H0V5h15v1zm0 4H0V9h15v1zm0 4H0v-1h15v1z"
            fill="currentColor"
          ></path>
        </svg>
        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-5 w-5 h-5" v-else>
          <path d="M1.5 1.5l12 12m-12 0l12-12" stroke="currentColor"></path>
        </svg>
      </button>

      <div class="logo text-2xl text-white italic">Bich Bui</div>
    </div>
    <div
      class="z-40 h-screen w-screen absolute bg-transparent"
      @click="toggleNavbar()"
      v-show="isNavbarDisplayed"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LanguageSwitcher from './LanguageSwitcher.vue'

@Component({
  components: { LanguageSwitcher }
})
export default class Navbar extends Vue {
  isNavbarDisplayed = false
  toggleNavbar() {
    this.isNavbarDisplayed = !this.isNavbarDisplayed
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav {
  transition: all 0.5 ease-in-out;
}
</style>
