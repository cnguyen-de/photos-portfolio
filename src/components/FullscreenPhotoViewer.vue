<template>
  <div
    class="preview fixed z-50 left-0 top-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center focus:outline-none"
  >
    <div class="absolute h-full w-full" @click="togglePreview()"></div>
    <img :src="photo.url" alt="" @contextmenu.prevent="" class="absolute max-w-full max-h-full" />
    <button
      class="absolute mr-8 mt-8 top-0 right-0 w-12 h-12 text-white outline-none focus:outline-none hover:bg-gray-700 hover:bg-opacity-60 rounded flex items-center justify-center"
      @click="togglePreview()"
    >
      <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
        <path d="M1.5 1.5l12 12m-12 0l12-12" stroke="currentColor"></path>
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, PropSync, Watch } from 'vue-property-decorator'
import fb from 'firebase/app'
import Photo = fb.firestore.DocumentData
import { vxm } from '@/store/store.vuex'
@Component
export default class PhotoViewer extends Vue {
  @PropSync('component', { type: String }) currentComponent!: string

  photos: Photo[] = []

  mounted() {
    this.updateGalleryPhotos()
    this.updateAlbumsPhotos()
    this.photos = []
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Left': // IE/Edge specific value
        case 'ArrowLeft':
          this.changeLeftPhoto()
          break

        case 'Right': // IE/Edge specific value
        case 'ArrowRight':
          this.changeRightPhoto()
          break

        case 'Esc': // IE/Edge specific value
        case 'Escape':
          this.togglePreview()
          break
        default:
          return
      }
    })
  }

  changeLeftPhoto() {
    let index = 0
    const currentIndex = this.photos.indexOf(this.photo)
    if (currentIndex > 0) {
      index = currentIndex - 1
      this.$store.commit('app/setSelectedPhoto', this.photos[index])
    }
  }
  changeRightPhoto() {
    let index = 0
    const currentIndex = this.photos.indexOf(this.photo)

    if (currentIndex !== -1 && currentIndex < this.photos.length - 1) {
      index = currentIndex + 1
      this.$store.commit('app/setSelectedPhoto', this.photos[index])
    }
  }

  togglePreview() {
    this.$store.commit('app/toggleFullscreenImage', false)
    this.$store.commit('app/setSelectedPhoto', {})
  }

  get photo() {
    return vxm.app.selectedFullscreenImage
  }

  @Watch('galleryPhotos')
  updateGalleryPhotos() {
    if (this.currentComponent === 'gallery') this.photos = this.galleryPhotos
  }
  get galleryPhotos() {
    return vxm.firestore.galleryPhotos
  }

  @Watch('albumPhotos')
  updateAlbumsPhotos() {
    if (this.currentComponent === 'albums') this.photos = this.albumPhotos
  }
  get albumPhotos() {
    return vxm.firestore.albumPhotos
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
