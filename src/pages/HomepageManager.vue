<template>
  <div class="relative min-h-screen text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex flex-col">
    <div class="relative pb-4 text-center">Photos Manager {{ currentAlbum }}</div>
    <div class="w-full bg-gray-800 p-2 text-base md:text-xl">
      <router-link class="mr-3" to="/photos-manager/homepage">
        <button
          class="bg-gray-900 rounded p-3 focus:outline-none hover:bg-blue-900"
          :class="{ 'bg-blue-700': selectedComponent === 'homepage' }"
          @click="selectComponent('homepage')"
        >
          {{ $t('nav.homepage') }}
        </button>
      </router-link>
      <router-link class="mr-3" to="/photos-manager/gallery">
        <button
          class="bg-gray-900 rounded p-3 focus:outline-none hover:bg-blue-900"
          :class="{ 'bg-blue-700': selectedComponent === 'gallery' }"
          @click="selectComponent('gallery')"
        >
          {{ $t('nav.gallery') }}
        </button>
      </router-link>
      <router-link to="/photos-manager/albums">
        <button
          class="bg-gray-900 rounded p-3 focus:outline-none hover:bg-blue-900"
          :class="{ 'bg-blue-700': selectedComponent === 'albums' }"
          @click="selectComponent('albums')"
        >
          {{ $t('nav.album') }}
        </button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PhotoManager from '../components/PhotoManager.vue'
import AlbumManager from '../components/AlbumManager.vue'

import { vxm } from '@/store/store.vuex'

@Component({ components: { PhotoManager, AlbumManager } })
export default class HomepageManager extends Vue {
  routePaths = ''
  mounted() {
    this.routePaths = this.$route.path.split('/').slice(-1)[0]

    if (this.routePaths === 'homepage' || this.routePaths === 'gallery' || this.routePaths === 'albums') {
      this.$store.dispatch('app/setSelectedPhotoManagerComponent', this.routePaths)
    }
  }
  selectComponent(component: string) {
    setTimeout(() => {
      this.$store.dispatch('app/setSelectedPhotoManagerComponent', component)
    }, 50)
    this.$store.commit('firestore/updateSelectedTitle', '')
  }

  get selectedComponent() {
    return vxm.app.selectedPhotoManagerComponent
  }

  get currentAlbum() {
    return vxm.firestore.selectedAlbumTitle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
