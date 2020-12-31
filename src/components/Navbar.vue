<template>
  <div class="">
    <div
      class="nav nav--desktop fixed left-0 md:visible md:opacity-100 text-white bg-opacity-50 z-50 flex bg-gradient-to-r from-transBlack to-transparent min-h-screen md:w-52 md:flex flex-col justify-between items-center"
      :class="{ 'invisible w-20 opacity-0': !isNavbarDisplayed, 'visible w-52 opacity-100': isNavbarDisplayed }"
    >
      <div class=" logo text-2xl text-white pt-10 lg:pt-24">
        <span class="hidden md:block">
          <router-link to="/" class="p-2">
            <span class="text-base lg:text-2xl text-white">Bich Bui</span>
          </router-link>
        </span>
      </div>
      <div class="flex-grow"></div>
      <div class="nav__links flex flex-col">
        <router-link to="/gallery" class="p-2">
          <span class="text-base lg:text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.gallery') }}</span>
        </router-link>

        <router-link to="/albums" class="p-2">
          <span class="text-base lg:text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.album') }}</span>
        </router-link>

        <router-link to="/about" class="p-2">
          <span class="text-base lg:text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.about') }}</span>
        </router-link>
      </div>
      <div class="flex-grow"></div>
      <LanguageSwitcher class="w-full px-16 pb-10 lg:pb-20" />
    </div>
    <div
      class="nav--mobile md:hidden flex fixed h-16 left-0 bg-opacity-50 z-50 bg-gradient-to-b from-transBlack to-transparent w-screen items-center justify-center"
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
          v-show="!isNavbarDisplayed"
        >
          <path d="M0 3.5h15m-15 8h15m-15-4h15" stroke="currentColor"></path>
        </svg>
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="ml-5 w-5 h-5"
          v-show="isNavbarDisplayed"
        >
          <path d="M1.5 1.5l12 12m-12 0l12-12" stroke="currentColor"></path>
        </svg>
      </button>

      <div class="logo text-xl text-white">
        <router-link to="/" class="p-2">
          <span @click="toggleNavbar(false)">Bich Bui</span>
        </router-link>
      </div>
    </div>
    <div class="z-40 h-screen w-screen fixed bg-transparent" @click="toggleNavbar()" v-show="isNavbarDisplayed"></div>
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
  toggleNavbar(state?: boolean) {
    if (typeof state !== 'undefined') {
      this.isNavbarDisplayed = state
    } else {
      this.isNavbarDisplayed = !this.isNavbarDisplayed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav,
svg {
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
</style>
