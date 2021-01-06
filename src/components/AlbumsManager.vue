<template>
  <div class="h-full w-full flex flex-row flex-wrap">
    <div v-for="album of albums" :key="album.id">
      <div
        class="album relative h-40 w-40 m-2 cursor-pointer rounded-md flex items-center justify-center bg-gray-800"
        @click="selectAlbum(album)"
        :class="{ ' border-4 border-blue-400': isAlbumSelected(album) }"
      >
        <Check class="absolute left-0 top-0 mt-1 ml-1 z-50" v-if="isAlbumSelected(album)" />
        <img
          :src="album.coverPhotoBaseUrl"
          alt=""
          class="absolute h-full object-cover rounded-md"
          :class="{ selected: isAlbumSelected(album) }"
        />
      </div>
      <div class="album-info text-sm text-center" :class="{ 'text-blue-400 font-bold': isAlbumSelected(album) }">
        <p>{{ album.title }}</p>
        <p>{{ album.mediaItemsCount }} {{ $tc('album.photo', album.mediaItemsCount) }}</p>
      </div>
    </div>

    <button
      class="fixed right-0 bottom-0 bg-blue-400 hover:bg-blue-500 focus:outline-none px-6 py-2 text-base font-bold mr-8 mb-8 rounded-full appearance-none outline-none"
      @click="syncSelectedAlbums()"
    >
      Sync
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'
import Check from '../components/Check.vue'
// eslint-disable-next-line no-undef
import Album = gapi.client.photoslibrary.Album

@Component({
  components: { Check }
})
export default class AlbumsManager extends Vue {
  selected: Album[] = []

  created() {
    this.$store.dispatch('photos/listAlbums')
  }

  @Watch('isSignedIn')
  onIsSignedInChanged() {
    this.$store.dispatch('photos/listAlbums')
  }

  selectAlbum(album: Album) {
    if (!this.isAlbumSelected(album)) {
      this.selected.push(album)
    } else {
      const index = this.selected.indexOf(album)
      if (index > -1) {
        this.selected.splice(index, 1)
      }
    }
  }
  syncSelectedAlbums() {
    console.log('sync', this.selected)
  }

  get isSignedIn() {
    return vxm.photos.isSignedIn
  }

  get albums() {
    return vxm.photos.albums
  }

  @Watch('selected')
  isAlbumSelected(album: Album): boolean {
    return this.selected.includes(album)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.album {
  transform: scale(1);
  transition: all 0.1s ease-in-out;
}
.selected {
  transform: scale(0.9);
  transition: all 0.1s ease-in-out;
}
</style>
