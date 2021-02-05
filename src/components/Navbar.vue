<template>
  <div class="">
    <div
      class="nav nav--desktop fixed left-0 md:visible md:opacity-100 text-white bg-opacity-50 z-50 flex bg-gradient-to-r from-transBlack to-transparent min-h-screen md:w-48 md:flex flex-col justify-between items-center"
      style="min-height: -webkit-fill-available"
      :class="{ 'invisible w-20 opacity-0': !isNavbarDisplayed, 'visible w-52 opacity-100': isNavbarDisplayed }"
    >
      <div class="logo text-2xl text-white pt-10 lg:pt-20">
        <span class="hidden md:block">
          <router-link to="/" class="p-2">
            <span class="logo px-4">
              <img class="h-10" :src="logoSrc" />
            </span>
          </router-link>
        </span>
      </div>
      <div class="flex-grow"></div>
      <div class="navbar__links flex flex-col font-thin tracking-wide">
        <router-link to="/gallery" class="navbar__link relative my-2">
          <span class="text-base lg:text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.gallery') }}</span>
        </router-link>

        <router-link to="/albums" class="navbar__link relative my-2">
          <span class="text-base lg:text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.album') }}</span>
        </router-link>

        <router-link to="/about" class="navbar__link relative my-2">
          <span class="text-base lg:text-2xl text-white" @click="toggleNavbar()">{{ $t('nav.about') }}</span>
        </router-link>
      </div>
      <div class="flex-grow"></div>
      <router-link to="/login">
        <button
          class="px-4 py-2 bg-gray-800 bg-opacity-20 rounded-full hover:bg-opacity-50 mb-2 focus:outline-none text-gray-200"
          style="min-width: 6rem"
          v-if="!user"
        >
          {{ $t('user.login') }}
        </button>
        <div class="relative h-12 w-12 mb-4" v-else>
          <div
            class="rounded-full absolute bg-white bg-opacity-70"
            style="height: 3.25rem; width: 3.25rem; top: -2px; left: -2px"
          ></div>
          <img :src="user.photoURL" alt="" class="absolute rounded-full h-full w-full object-cover hover:opacity-90" />
        </div>
      </router-link>
      <LanguageSwitcher class="w-full px-12 pb-12" />
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

      <div class="nav__logo--mobile text-xl text-white my-auto h-8 p-1">
        <router-link to="/">
          <span @click="toggleNavbar(false)">
            <img class="h-6" :src="logoSrc" />
          </span>
        </router-link>
      </div>
    </div>
    <div class="z-40 h-screen w-screen fixed bg-transparent" @click="toggleNavbar()" v-show="isNavbarDisplayed"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { vxm } from '@/store/store.vuex'

@Component({
  components: { LanguageSwitcher }
})
export default class Navbar extends Vue {
  logoSrc =
    'https://firebasestorage.googleapis.com/v0/b/photos-portfolio-300318.appspot.com/o/logo.png?alt=media&token=6c587bd0-e754-4a78-b26e-f355aa39d89b'
  isNavbarDisplayed = false

  toggleNavbar(state?: boolean) {
    if (window.innerWidth < 768) {
      if (typeof state !== 'undefined') {
        this.isNavbarDisplayed = state
      } else {
        this.isNavbarDisplayed = !this.isNavbarDisplayed
      }
    }
  }

  get user() {
    return vxm.user.username
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
.navbar__link {
  transition-delay: 0.2;
  transform: translate(0%, 100%);
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.navbar__link:before {
  content: '';
  position: absolute;
  background: white;
  width: 0px;
  height: 1px;
  top: 100%;
  transform: translate(0%, 0%);
  transition: all 0.2s ease;
  z-index: -1;
}
.navbar__link:hover:before {
  width: 100%;
}
</style>
