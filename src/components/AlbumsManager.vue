<template>
  <div class="albums">
    <div class="albums__homepage">
      <div class="text-2xl">{{ $t('nav.homepage') }}</div>
      <Albums :albums="homepageAlbum" />
    </div>
    <div class="albums__gallery mt-4">
      <div class="text-2xl">{{ $t('nav.gallery') }}</div>
      <Albums :albums="galleryAlbum" />
    </div>
    <div class="albums__albums mt-4">
      <div class="text-2xl">{{ $t('nav.album') }}</div>
      <Albums :albums="albums" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'
import Check from '../components/Check.vue'
import Albums from '../components/GooglePhotosAlbum.vue'

// eslint-disable-next-line no-undef
import Album = gapi.client.photoslibrary.Album

@Component({
  components: { Check, Albums }
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

  get isSignedIn() {
    return vxm.photos.isSignedIn
  }

  get albums() {
    return vxm.photos.albums.filter(album => album.title !== 'Gallery' && album.title !== 'Homepage')
  }

  get homepageAlbum() {
    return vxm.photos.albums.filter(album => album.title?.toLowerCase() === 'homepage')
  }

  get galleryAlbum() {
    return vxm.photos.albums.filter(album => album.title?.toLowerCase() === 'gallery')
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
