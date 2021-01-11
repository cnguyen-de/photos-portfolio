<template>
  <div class="h-full w-full flex flex-row flex-wrap">
    <div v-for="album of albums" :key="album.title">
      <div
        class="relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex items-center justify-center bg-gray-800"
        :class="{ ' border-4 border-blue-400': isAlbumSelected(album) }"
      >
        <Check class="absolute left-0 top-0 mt-3 ml-3 z-50" v-if="isAlbumSelected(album)" />
        <img
          :src="album.photos[0].url"
          alt=""
          class="album absolute h-full w-full object-cover rounded-md"
          :class="{ selected: isAlbumSelected(album) }"
          v-if="album.photos.length > 0"
          @click="unselectAlbum(album)"
        />
        <div
          class="options absolute h-full w-full opacity-0 hover:opacity-100 rounded-md"
          v-show="!isAlbumSelected(album)"
        >
          <div
            class="options__select h-1/3 w-1/3 bg-gray-900 bg-opacity-30 hover:bg-opacity-60 flex justify-start items-start rounded-t-md"
            @click="selectAlbum(album)"
          >
            <Check class="mt-3 ml-3" />
          </div>
          <div class="options__open absolute h-full w-full top-0 rounded-md" @click="openAlbum(album.id)"></div>
        </div>
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

    <div
      class="photos__delete fixed flex flex-row transition duration-150 ease-linear right-0 bottom-0 bg-blue-600 hover:bg-blue-500 focus:outline-none px-6 py-2 text-base font-bold mr-8 mb-8 rounded-full appearance-none outline-none"
      @click="deleteAlbums()"
      v-if="selectedAlbums.length !== 0"
    >
      <svg
        class="w-6 h-6 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        ></path>
      </svg>
      <button>Delete selected albums</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'
import fb from 'firebase/app'
import Album = fb.firestore.DocumentData
import Check from '@/components/Check.vue'
import firebase from '../services/firebase'

@Component({ components: { Check } })
export default class AlbumManager extends Vue {
  selectedAlbums: Album[] = []

  mounted() {
    this.$store.dispatch('firestore/getAlbums')
  }

  selectAlbum(album: Album) {
    if (!this.isAlbumSelected(album)) {
      this.selectedAlbums.push(album)
    } else {
      this.unselectAlbum(album)
    }
  }

  unselectAlbum(album: Album) {
    if (this.isAlbumSelected(album)) {
      const index = this.selectedAlbums.indexOf(album)
      if (index > -1) {
        this.selectedAlbums.splice(index, 1)
      }
    }
  }

  openAlbum(albumId: string) {
    this.$router.push(`/photos-manager/albums/${albumId}`)
  }

  deleteAlbums() {
    this.selectedAlbums.forEach((album, index) => {
      firebase.albums
        .doc(album.id)
        .delete()
        .then(() => {
          if (index === this.selectedAlbums.length - 1) {
            this.selectedAlbums = []
            this.$store.dispatch('firestore/getAlbums')
            this.$swal({
              position: 'bottom',
              text: 'Album deleted',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
    })
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

  @Watch('selectedAlbums')
  isAlbumSelected(album: Album): boolean {
    return this.selectedAlbums.includes(album)
  }

  get albums() {
    return vxm.firestore.albums
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.options__select {
  clip-path: polygon(0 0, 100% 0%, 0% 100%, 0 100%);
}
.options__open {
  clip-path: polygon(33% 0%, 100% 0%, 100% 100%, 0 100%, 0 33%);
}
.album {
  transform: scale(1);
  transition: all 0.1s ease-in-out;
}
.selected {
  transform: scale(0.9);
  transition: all 0.1s ease-in-out;
}
</style>
