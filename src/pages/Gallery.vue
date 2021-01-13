<template>
  <div class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex justify-center md:justify-start">
    <div class="container h-full w-full">
      <figure v-for="photo of galleryPhotos" :key="photo.name">
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
    <transition name="zoom">
      <FullscreenPhotoViewer component="gallery" v-if="isDisplayingFullscreenImage" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'
import FullscreenPhotoViewer from '@/components/FullscreenPhotoViewer.vue'
import fb from 'firebase/app'
import Photo = fb.firestore.DocumentData

@Component({
  components: { FullscreenPhotoViewer }
})
export default class Gallery extends Vue {
  mounted() {
    this.$store.dispatch('firestore/getGalleryPhotos')
  }

  displayFullscreenImage(photo: Photo) {
    this.$store.commit('app/setSelectedPhoto', photo)
    this.$store.commit('app/toggleFullscreenImage', true)
  }

  get isDisplayingFullscreenImage() {
    return vxm.app.isDisplayingFullscreenImage
  }

  get galleryPhotos() {
    return vxm.firestore.galleryPhotos
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
