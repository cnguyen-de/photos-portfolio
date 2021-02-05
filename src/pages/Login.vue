<template>
  <div class="pt-20 md:pt-4 p-4 pl-4 md:pl-48 min-h-screen grid items-center">
    <div class="login w-full flex justify-center h-2/3">
      <div class="w-full xl:w-1/2 bg-gray-800 flex justify-center items-center rounded-lg">
        <div class="login--no-user" v-if="!user">
          <div class="text-2xl text-gray-100">{{ $t('user.notLoggedIn') }}</div>
          <button
            class="h-12 py-1 px-10 mt-4 rounded-full bg-gray-700 focus:outline-none hover:bg-gray-300 appearance-none outline-none border-2 border-gray-800 text-gray-300 hover:text-gray-700"
            @click="login()"
          >
            <svg class="relative inline h-4 w-4 mb-1 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                fill="#4285f4"
              />
              <path
                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                fill="#34a853"
              />
              <path
                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                fill="#fbbc04"
              />
              <path
                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                fill="#ea4335"
              />
            </svg>
            {{ $t('user.loginWith') }} Google
          </button>
          {{ user }}
        </div>
        <div class="login--has-user text-xl text-white text-center flex flex-col p-4 h-2/3" v-else>
          <span class="text-2xl xl:text-4xl tracking-wide mb-2 md:mb-12">
            {{ $t('user.welcome') }}
          </span>
          <div class="login__user-info flex flex-col md:flex-row p-4 justify-center items-center text-base md:text-2xl">
            <div class="relative h-24 w-24 m-4">
              <div
                class="rounded-full absolute bg-white"
                style="height: 6.25rem; width: 6.25rem; top: -2px; left: -2px"
              ></div>
              <img :src="user.photoURL" alt="" class="absolute rounded-full h-full w-full object-cover" />
            </div>

            {{ user.displayName }}
          </div>
          <div class="login__actions">
            <button
              class="h-12 px-10 mb-4 text-base md:text-xl rounded-full bg-gray-700 focus:outline-none hover:bg-gray-300 appearance-none outline-none border-2 border-gray-800 text-gray-300 hover:text-gray-700"
              @click="goToHomepage()"
            >
              {{ $t('album.manager') }}
            </button>

            <button
              class="h-12 px-10 mb-4 ml-2 text-base md:text-xl rounded-full bg-red-600 focus:outline-none hover:bg-red-500 appearance-none outline-none text-gray-300 hover:text-gray-200"
              @click="logout()"
            >
              {{ $t('user.logout') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '../store/store.vuex'
import { USER_LOGIN, USER_LOGOUT } from '../store/actions'

@Component
export default class Login extends Vue {
  login() {
    this.$store.dispatch('user/' + USER_LOGIN)
  }

  logout() {
    this.$store.dispatch('user/' + USER_LOGOUT)
  }

  goToHomepage() {
    this.$router.push('/photos-manager/homepage')
    this.$store.dispatch('app/setSelectedPhotoManagerComponent', 'homepage')
  }

  get user() {
    return vxm.user.getUser
  }

  get hasEditPermission() {
    return vxm.user.hasEditPermission
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
