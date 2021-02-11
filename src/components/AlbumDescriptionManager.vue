<template>
  <div
    class="relative min-h-20 bg-gray-800 bg-opacity-50 hover:bg-opacity-80 text-gray-300 text-base rounded-lg"
    :class="{ ' cursor-pointer': hasEditPermission }"
    @click="editDescription()"
  >
    <div class="p-4" v-show="!isTextAreaDisplayed">
      <p class="whitespace-pre-wrap">{{ description }}</p>
    </div>
    <span class="absolute top-0 right-0 mr-2 mt-2" v-if="hasEditPermission">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        ></path>
      </svg>
    </span>

    <div class="relative h-40 w-full bg-gray-800 rounded-lg" v-if="isTextAreaDisplayed">
      <textarea
        autofocus
        class="h-full w-full text-gray-200 p-4 bg-gray-800 rounded-lg"
        v-model="description"
        id="edit"
      ></textarea>
      <button
        class="absolute bottom-0 right-0 px-3 py-1 mr-20 mb-2 bg-blue-500 hover:bg-blue-700 rounded"
        @click="submitDescription()"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </button>
      <button
        class="absolute bottom-0 right-0 px-3 py-1 mr-6 mb-2 bg-red-500 hover:bg-red-700 rounded"
        @click="cancelEdit()"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
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
  backupDescription = ''
  isTextAreaDisplayed = false

  mounted() {
    this.updateDescription()
  }

  editDescription() {
    if (this.hasEditPermission) {
      this.isTextAreaDisplayed = true
      this.backupDescription = this.description
      setTimeout(() => {
        document.getElementById('edit')?.focus()
      }, 50)
    }
  }

  cancelEdit() {
    this.description = this.backupDescription
    setTimeout(() => {
      this.isTextAreaDisplayed = false
    }, 50)
  }

  submitDescription() {
    setTimeout(() => {
      this.isTextAreaDisplayed = false
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
