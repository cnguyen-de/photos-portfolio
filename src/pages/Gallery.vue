<template>
  <div class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex justify-center">
    <div class="container">
      <figure v-for="image of array" :key="image">
        <img
          class="rounded-lg cursor-pointer"
          loading="lazy"
          :src="image"
          @contextmenu.prevent=""
          alt=""
          @click="displayFullscreenImage(image)"
        />
        <figcaption><a href="#"></a></figcaption>
      </figure>
    </div>
    <div
      class="preview fixed z-50 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center"
      v-if="isDisplayingFullscreenImage"
    >
      <img :src="selectedImage" alt="" class="absolute h-full w-full object-contain" />
      <button
        class="nav__toggle absolute mr-4 mt-4 right-0 w-12 h-12 text-white outline-none focus:outline-none hover:bg-gray-700 rounded flex items-center justify-center"
        @click="togglePreview()"
      >
        <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
          <path d="M1.5 1.5l12 12m-12 0l12-12" stroke="currentColor"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Gallery extends Vue {
  array = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']
  isDisplayingFullscreenImage = false
  selectedImage = ''
  displayFullscreenImage(image: string) {
    this.selectedImage = image
    this.isDisplayingFullscreenImage = true
  }
  togglePreview() {
    this.selectedImage = ''
    this.isDisplayingFullscreenImage = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.preview {
  margin-top: -1rem;
}
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
@media only screen and (max-width: 768px) {
  .container {
    column-count: 1;
  }
  .preview {
    margin-top: -5rem;
  }
}
</style>
