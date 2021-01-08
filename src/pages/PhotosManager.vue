<template>
  <div class="relative min-h-screen text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex flex-col">
    <div class="relative pb-4 text-center cursor-pointer">
      {{ $t('album.manager') }}
      <span
        class="absolute top-0 right-0 rounded transition duration-150 ease-linear hover:bg-gray-800 p-2"
        @click="loadAlbums()"
      >
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

    <div
      class="fixed flex flex-row transition duration-150 ease-linear right-0 bottom-0 bg-blue-600 hover:bg-blue-500 focus:outline-none px-6 py-2 text-base font-bold mr-8 mb-8 rounded-full appearance-none outline-none"
      @click="syncAlbums()"
    >
      <svg
        class="relative h-6 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        ></path>
      </svg>
      <button>Update Website</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GooglePhotosAuth from '../components/GooglePhotosAuth.vue'
import AlbumsManager from '../components/AlbumsManager.vue'
import { vxm } from '@/store/store.vuex'
// eslint-disable-next-line no-undef
import Album = gapi.client.photoslibrary.Album

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

  syncAlbums() {
    const homepageAlbum = this.albums.filter(album => album.title?.toLowerCase() === 'homepage')
    const galleryAlbum = this.albums.filter(album => album.title?.toLowerCase() === 'gallery')
    const albums = this.albums.filter(album => album.title !== 'Gallery' && album.title !== 'Homepage')
    if (homepageAlbum.length !== 0) {
      this.syncAlbum(homepageAlbum)
    }
    if (galleryAlbum.length !== 0) {
      this.syncAlbum(galleryAlbum)
    }
    if (galleryAlbum.length !== 0) {
      this.syncAlbum(albums)
    }
    //this.$store.dispatch('photos/getAlbum', this.albums[0].id)
  }

  syncAlbum(albums: Album[]) {
    for (const album of albums) {
      this.$store.dispatch('photos/getAlbum', album.id)
    }
  }

  get isSignedIn() {
    return vxm.photos.isSignedIn
  }

  get albums() {
    return vxm.photos.albums
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
