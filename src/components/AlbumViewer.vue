<template>
  <div class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white">
    <div class="flex flex-col justify-center md:justify-start">
      <div class="header relative w-full text-3xl pt-0 md:pt-4 pb-4 pl-10 text-center flex focus:outline-none">
        <span
          class="absolute top-0 left-0 p-2 md:p-3 mt-0 md:mt-2 hover:bg-gray-800 rounded-full cursor-pointer"
          @click="$router.go(-1)"
        >
          <svg
            class="w-6 md:w-8 h-6 md:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </span>
        <span class="text-center flex-grow">{{ albumTitle }}</span>
      </div>
      <AlbumDescriptionManager class="my-4" />
      <div class="container h-full w-full" v-if="albumPhotos.length !== 0">
        <figure v-for="photo of albumPhotos" :key="photo.name">
          <img
            class="rounded-lg cursor-pointer hover:opacity-80"
            loading="lazy"
            :src="photo.url"
            @contextmenu.prevent=""
            alt=""
            @click="displayFullscreenImage(photo)"
          />
        </figure>
      </div>
      <div class="mt-20" v-else>This album has no photo</div>
      <transition name="zoom">
        <FullscreenPhotoViewer component="albums" v-if="isDisplayingFullscreenImage" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AlbumDescriptionManager from '@/components/AlbumDescriptionManager.vue'
import { vxm } from '@/store/store.vuex'
import fb from 'firebase/app'
import Photo = fb.firestore.DocumentData
import FullscreenPhotoViewer from '@/components/FullscreenPhotoViewer.vue'
@Component({
  components: { FullscreenPhotoViewer, AlbumDescriptionManager }
})
export default class AlbumViewer extends Vue {
  created() {
    const albumId = this.$route.path.split('/').slice(-1)[0]
    this.$store.dispatch('firestore/getAlbumPhotos', albumId)
  }

  displayFullscreenImage(image: Photo) {
    this.$store.commit('app/setSelectedPhoto', image)
    this.$store.commit('app/toggleFullscreenImage', true)
  }

  get albumPhotos() {
    return vxm.firestore.albumPhotos
  }

  get albumTitle() {
    return vxm.firestore.selectedAlbumTitle
  }

  get isDisplayingFullscreenImage() {
    return vxm.app.isDisplayingFullscreenImage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  column-count: 3;
  column-gap: 16px;
}

figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 16px;
  break-inside: avoid;
}

figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
}
@media only screen and (max-width: 768px) {
  .container {
    column-count: 1;
  }
}

.zoom-enter-active {
  animation: zoom-in 0.15s ease-in-out;
}
.zoom-leave-active {
  animation: zoom-in 0.15s reverse ease-in-out;
}
@keyframes zoom-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
