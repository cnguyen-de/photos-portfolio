<template>
  <div class="h-full w-full flex flex-row flex-wrap">
    <div v-for="album of albums" :key="album.id">
      <a :href="album.productUrl" target="_blank" :title="$t('album.openNewTab', [album.title])">
        <div
          class="albums__album relative h-40 w-40 my-2 mr-4 cursor-pointer rounded-md flex items-center justify-center bg-gray-800"
        >
          <img :src="album.coverPhotoBaseUrl" alt="" class="absolute h-full w-full object-cover rounded-md" />
        </div>
      </a>
      <div class="albums__album-info text-sm mr-4 text-center">
        <p>{{ album.title }}</p>
        <p>{{ album.mediaItemsCount }} {{ $tc('album.photo', album.mediaItemsCount) }}</p>
      </div>
    </div>
    <!-- <div class="h-full w-full flex flex-row flex-wrap">
        <div v-for="album of albums" :key="album.id">
          <div
            class="albums__album relative h-40 w-40 my-2 mr-4 cursor-pointer rounded-md flex items-center justify-center bg-gray-800"
            @click="selectAlbum(album)"
            :class="{ ' border-4 border-blue-400': isAlbumSelected(album) }"
          >
            <Check class="absolute left-0 top-0 mt-1 ml-1 z-50" v-if="isAlbumSelected(album)" />
            <img
              :src="album.coverPhotoBaseUrl"
              alt=""
              class="absolute h-full w-full object-cover rounded-md"
              :class="{ selected: isAlbumSelected(album) }"
            />
          </div>
          <div
            class="albums__album-info text-sm text-center"
            :class="{ 'text-blue-400 font-bold': isAlbumSelected(album) }"
          >
            <p>{{ album.title }}</p>
            <p>{{ album.mediaItemsCount }} {{ $tc('album.photo', album.mediaItemsCount) }}</p>
          </div>
        </div>
      </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

// eslint-disable-next-line no-undef
import Album = gapi.client.photoslibrary.Album
@Component
export default class Albums extends Vue {
  @Prop({ default: [] }) readonly albums: Album[] | undefined
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
