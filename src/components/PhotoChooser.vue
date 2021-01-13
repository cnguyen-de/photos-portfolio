<template>
  <div class="max-h-full min-w-md w-full overflow-auto p-4 bg-gray-800 text-gray-200">
    <div
      class="accordion w-full p-3 text-xl cursor-pointer bg-gray-900 hover:bg-opacity-50 rounded-md mb-2"
      v-for="album of albums"
      :key="album.id"
    >
      <div @click="displayPhotos(album.id)">
        <span class="tracking-wide">{{ album.title }}</span>
        <span class="ml-2 text-base font-thin">
          {{ album.photos.length }} {{ $tc('album.photo', album.photos.length) }}
        </span>
      </div>

      <div class="h-full w-full flex flex-row flex-wrap" v-if="isDisplayingAlbumId === album.id">
        <div v-for="photo of album.photos" :key="photo.id">
          <div
            class="photos__photo relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex items-center justify-center bg-gray-800"
            @click="selectPhoto(photo)"
            :class="{ ' border-4 border-blue-400': isPhotoSelected(photo) }"
          >
            <Check class="absolute left-0 top-0 mt-1 ml-1 z-50" v-if="isPhotoSelected(photo)" />
            <img
              :src="photo.url"
              alt=""
              class="photo absolute h-full w-full object-cover rounded-md"
              :class="{ selected: isPhotoSelected(photo) }"
              v-if="photo.url"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="relative buttons h-20">
      <div class="absolute bottom-0 right-0">
        <button class="px-6 py-2 bg-red-600 hover:bg-red-700 rounded" @click="cancel()">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <button class="ml-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded" @click="add()">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'
import fb from 'firebase/app'
import Photo = fb.firestore.DocumentData
import Check from '@/components/Check.vue'
import firebase from '../services/firebase'

@Component({ components: { Check } })
export default class PhotoChooser extends Vue {
  firebaseTarget: fb.firestore.CollectionReference<Photo> = firebase.homepage
  selected: Photo[] = []
  isDisplayingAlbumId = ''

  mounted() {
    this.$store.dispatch('firestore/getAlbums')
  }

  selectPhoto(photo: Photo) {
    if (!this.isPhotoSelected(photo)) {
      this.selected.push(photo)
    } else {
      const index = this.selected.indexOf(photo)
      if (index > -1) {
        this.selected.splice(index, 1)
      }
    }
  }

  displayPhotos(albumId: string) {
    this.isDisplayingAlbumId = albumId
  }

  cancel() {
    this.$modal.hideAll()
  }

  add() {
    this.selected.forEach(photo => {
      console.log(this.currentComponent)
      if (this.currentComponent === 'gallery') {
        this.$store.dispatch('firestore/addGalleryPhotos', photo)
        this.$store.dispatch('firestore/getGalleryPhotos')
      } else if (this.currentComponent === 'homepage') {
        this.$store.dispatch('firestore/addHomepagePhotos', photo)
        this.$store.dispatch('firestore/getHomepagePhotos')
      }
    })
    this.$modal.hideAll()
  }

  @Watch('selected')
  isPhotoSelected(photo: Photo): boolean {
    return this.selected.includes(photo)
  }

  get albums() {
    return vxm.firestore.albums
  }

  get currentComponent() {
    return vxm.app.selectedPhotoManagerComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
