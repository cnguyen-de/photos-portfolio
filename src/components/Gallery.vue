<template>
  <div class="text-3xl pt-20 p-4 md:pl-40 text-white flex justify-center">
    <div class="container">
      <figure v-for="image of array" :key="image">
        <img :src="image" @contextmenu.prevent="" alt="" />
        <figcaption><a href="#"></a></figcaption>
      </figure>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Gallery extends Vue {
  array = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  column-count: 3;
  column-gap: 16px;
}

figure {
  margin: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  margin-bottom: 16px;
  break-inside: avoid;
}

figure > img {
  grid-row: 1 / -1;
  grid-column: 1;
}
</style>
