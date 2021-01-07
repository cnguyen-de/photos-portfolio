<template>
  <div class="flex flex-col">
    <button
      class="min-h-12 py-2 max-w-md text-xl px-10 mb-4 rounded-full bg-gray-700 focus:outline-none hover:bg-gray-300 appearance-none outline-none border-2 border-gray-800 text-gray-300 hover:text-gray-700"
      @click="authenticate()"
    >
      {{ $t('album.authorize') }}
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GooglePhotosAuth extends Vue {
  async authenticate() {
    this.$gapi.login()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
