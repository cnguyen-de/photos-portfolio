<template>
  <div class="text-3xl pt-20 p-4 md:pl-40 text-white flex justify-center">
    {{ $t('intro.greet') }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class About extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
