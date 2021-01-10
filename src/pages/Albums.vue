<template>
  <div class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex flex-col justify-center">
    <div class="h-full w-full flex flex-row flex-wrap">
      <div v-for="album of albums" :key="album.title">
        <div
          class="relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-lg flex items-center justify-center bg-gray-800"
          @click="selectAlbum(album.id)"
        >
          <img
            :src="album.photos[0].url"
            alt=""
            @contextmenu.prevent=""
            class="absolute h-full w-full object-cover rounded-lg hover:opacity-80"
            v-if="album.photos.length > 0"
          />
        </div>
        <div class="albums__album-info text-sm mr-4 text-center">
          <p class="font-bold text-base">{{ album.title }}</p>
          <p>{{ album.photos.length }} {{ $tc('album.photo', album.photos.length) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'

@Component({})
export default class About extends Vue {
  mounted() {
    this.$store.dispatch('firestore/getAlbums')
  }

  selectAlbum(albumId: string) {
    this.$router.push(`/albums/${albumId}`)
  }

  get albums() {
    return vxm.firestore.albums
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
