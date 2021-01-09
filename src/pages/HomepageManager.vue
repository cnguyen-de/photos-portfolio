<template>
  <div class="relative min-h-screen text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex flex-col">
    <div class="relative pb-4 text-center">Homepage Manager</div>
    <PhotoManager target="homepage" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PhotoManager from '../components/PhotoManager.vue'

@Component({ components: { PhotoManager } })
export default class HomepageManager extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
