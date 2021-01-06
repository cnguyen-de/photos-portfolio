<template>
  <div class="w-full pb-4 text-xl">
    <div class="">Sync all albums</div>
    <div class="">Add albums</div>
    <div class="">Sync gallery</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SyncOptions extends Vue {
  selectedOption: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
