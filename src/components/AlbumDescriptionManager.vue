<template>
  <div
    class="min-h-20 bg-gray-800 bg-opacity-50 hover:bg-opacity-80 text-gray-300 text-base rounded-lg cursor-pointer"
    @click="editDescription()"
  >
    <div class="p-4 h-20 whitespace-pre" v-show="!isTextAreaDisplayed">{{ description }}</div>

    <div class="relative h-full w-full bg-gray-800 rounded-lg" v-if="isTextAreaDisplayed">
      <textarea class="h-full w-full text-gray-200 p-4 bg-gray-800 rounded-lg" v-model="description"></textarea>
      <button
        class="absolute bottom-0 right-0 px-3 py-1 mr-6 mb-2 bg-blue-700 hover:bg-blue-800 rounded"
        @click="submitDescription()"
      >
        ok
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { vxm } from '@/store/store.vuex'

@Component
export default class AlbumDescriptionManager extends Vue {
  description = ''
  isTextAreaDisplayed = false

  editDescription() {
    if (this.hasEditPermission) this.isTextAreaDisplayed = true
  }

  submitDescription() {
    setTimeout(() => {
      this.isTextAreaDisplayed = false
      console.log(this.description, this.isTextAreaDisplayed)
      this.$store.dispatch('firestore/updateAlbumDescription', this.description)
    }, 50)
  }

  @Watch('selectedAlbum')
  updateDescription() {
    if (this.selectedAlbum?.description) {
      this.description = this.selectedAlbum?.description
    }
  }

  get selectedAlbum() {
    return vxm.firestore.selectedAlbum
  }

  get hasEditPermission() {
    return vxm.user.hasEditPermission
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
