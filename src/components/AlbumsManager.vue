<template>
  <div class="h-full w-full flex flex-row flex-wrap">
    <div v-for="album of albums" :key="album.id">
      <div class="relative h-40 w-40 m-2">
        <img :src="album.coverPhotoBaseUrl" alt="" class="absolute h-full object-cover rounded" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'

@Component({})
export default class AlbumsManager extends Vue {
  created() {
    this.$store.dispatch('photos/listAlbums')
  }
  @Watch('isSignedIn')
  onIsSignedInChanged() {
    this.$store.dispatch('photos/listAlbums')
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
