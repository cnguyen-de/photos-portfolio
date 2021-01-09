<template>
  <div class="h-full w-full flex flex-row flex-wrap">
    <div v-for="album of albums" :key="album.title">
      <div
        class="relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex items-center justify-center bg-gray-800"
        @click="selectAlbum(album.id)"
      >
        <img
          :src="album.photos[0].url"
          alt=""
          class="absolute h-full w-full object-cover rounded-md"
          v-if="album.photos.length > 0"
        />
      </div>
      <div class="albums__album-info text-sm mr-4 text-center">
        <p>{{ album.title }}</p>
        <p>{{ album.photos.length }} {{ $tc('album.photo', album.photos.length) }}</p>
      </div>
    </div>

    <div
      class="photos__photo relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-100"
      @click="addAlbum()"
    >
      <svg class="h-10 w-10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 1v13M1 7.5h13" stroke="currentColor"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'

@Component
export default class AlbumManager extends Vue {
  mounted() {
    this.$store.dispatch('firestore/getAlbums')
  }

  selectAlbum(albumId: string) {
    this.$router.push(`/photos-manager/albums/${albumId}`)
  }

  addAlbum() {
    this.$swal({
      title: 'What the title of new album?',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'OK',
      preConfirm: albumTitle => {
        this.$store.dispatch('firestore/createAlbum', albumTitle)
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.$store.dispatch('firestore/getAlbums')
      }
    })
  }

  get albums() {
    return vxm.firestore.albums
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
