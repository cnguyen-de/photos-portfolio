<template>
  <div
    class="relative min-h-screen text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex flex-col items-center text-justify"
  >
    <span class="pb-4">Photos Manager</span>
    <GooglePhotosAuth v-if="!isSignedIn" />
    <AlbumsManager v-else />
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
  created() {
    if (this.$gapi) {
      this.$gapi.isSignedIn().then(isSignedIn => this.$store.dispatch('photos/signIn', isSignedIn))
      this.$gapi.listenUserSignIn(isSignedIn => this.$store.dispatch('photos/signIn', isSignedIn))
    }
  }
  get isSignedIn() {
    return vxm.photos.isSignedIn
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
