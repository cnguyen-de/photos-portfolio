<template>
  <div class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex justify-center">
    {{ $t('nav.album') }}. {{ $t('placeholder') }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class About extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
