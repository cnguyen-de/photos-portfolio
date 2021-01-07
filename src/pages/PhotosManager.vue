<template>
  <div class="relative min-h-screen text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex flex-col">
    <div class="relative pb-4 text-center cursor-pointer">
      {{ $t('album.manager') }}
      <span class="absolute top-0 right-0 rounded hover:bg-gray-800 p-2" @click="loadAlbums()">
        <svg
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          :class="{ 'animate-spin': isAlbumsLoading }"
        >
          <path
            d="M.5 7.5A7 7 0 0113 3.17m1.5 4.33A7 7 0 012 11.83m3-.33H1.5V15m12-15v3.5H10"
            stroke="currentColor"
          ></path>
        </svg>
      </span>
    </div>

    <GooglePhotosAuth v-if="!isSignedIn" />
    <AlbumsManager v-if="isSignedIn" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GooglePhotosAuth from '../components/GooglePhotosAuth.vue'
import AlbumsManager from '../components/AlbumsManager.vue'

import { vxm } from '@/store/store.vuex'
@Component({
  components: { GooglePhotosAuth, AlbumsManager }
})
export default class PhotosManager extends Vue {
  isInit = false
  isAlbumsLoading = false
  created() {
    if (this.$gapi) {
      this.$gapi.isSignedIn().then(isSignedIn => this.$store.dispatch('photos/signIn', isSignedIn))
      this.$gapi.listenUserSignIn(isSignedIn => this.$store.dispatch('photos/signIn', isSignedIn))
    }
  }

  loadAlbums() {
    this.$store.dispatch('photos/listAlbums')
    this.isAlbumsLoading = true
    setTimeout(() => {
      this.isAlbumsLoading = false
    }, 1000)
  }
  get isSignedIn() {
    return vxm.photos.isSignedIn
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
