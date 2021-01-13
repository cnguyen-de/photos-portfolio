<template>
  <div class="pt-20 md:pt-4 p-4 pl-4 md:pl-48 h-screen w-full">
    <div class="login h-full w-full flex justify-center items-center">
      <div class="w-full h-2/3 lg:h-1/2 lg:w-1/2 bg-gray-800 flex justify-center items-center rounded-lg">
        <div class="login--no-user" v-if="!user">
          <div class="text-2xl text-gray-100">{{ $t('user.notLoggedIn') }}</div>
          <button
            class="h-12 px-10 mb-4 rounded-full bg-gray-700 focus:outline-none hover:bg-gray-300 appearance-none outline-none border-2 border-gray-800 text-gray-300 hover:text-gray-700"
            @click="login()"
          >
            {{ $t('user.loginWith') }} Google
          </button>
          {{ user }}
        </div>
        <div class="login--has-user text-xl text-white text-center flex flex-col p-8" v-else>
          <div class="login__user-info flex flex-col md:flex-row p-4 justify-center items-center">
            <div class="h-24 w-24 m-4">
              <img :src="user.photoURL" alt="" class="absoulte rounded-full h-full w-full object-cover" />
            </div>
            {{ user.displayName }}
          </div>
          <div class="login__actions">
            <button
              class="h-12 px-10 mb-4 rounded-full bg-gray-700 focus:outline-none hover:bg-gray-300 appearance-none outline-none border-2 border-gray-800 text-gray-300 hover:text-gray-700"
              @click="goToHomepage()"
            >
              {{ $t('album.manager') }}
            </button>

            <button
              class="h-12 px-10 mb-4 ml-2 rounded-full bg-red-500 focus:outline-none hover:bg-red-600 appearance-none outline-none text-gray-300 hover:text-gray-200"
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
