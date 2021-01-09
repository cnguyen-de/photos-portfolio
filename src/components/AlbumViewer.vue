<template>
  <div
    class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex flex-col justify-center text-justify items-center"
  >
    <div class="header relative w-full text-3xl pt-0 md:pt-4 pb-4 text-center flex">
      <span
        class="absolute top-0 left-0 p-2 mt-0 md:mt-4 hover:bg-gray-800 rounded-full cursor-pointer"
        @click="$router.go(-1)"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
      </span>
      <span class="text-center flex-grow">{{ albumTitle }}</span>
    </div>
    <div class="h-full w-full flex flex-row flex-wrap" v-if="albumPhotos.length !== 0">
      <div v-for="photo of albumPhotos" :key="photo.id">
        <div
          class="photos__photo relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex items-center justify-center bg-gray-800"
        >
          <img :src="photo.url" alt="" class="absolute h-full w-full object-cover rounded-md" v-if="photo.url" />
        </div>
      </div>
    </div>
    <div class="mt-20" v-else>This album has no photo</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'

@Component
export default class AlbumViewer extends Vue {
  created() {
    const albumId = this.$route.path.split('/').slice(-1)[0]
    this.$store.dispatch('firestore/getAlbumPhotos', albumId)
  }

  get albumPhotos() {
    return vxm.firestore.albumPhotos
  }

  get albumTitle() {
    return vxm.firestore.selectedAlbumTitle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
