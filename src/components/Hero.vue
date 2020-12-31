<template>
  <div class="hero">
    <div ref="bgImage" class="hero__bg-image h-screen w-screen">
      <img class="absolute object-cover h-full w-full" src="1.jpg" />
      <!-- 
      <div
        class="hero__overlay bg-opacity-50 bg-black absolute z-10 h-screen w-screen grid items-center justify-center"
      >
      
        <div class="hero__text text-center text-gray-100">
          <p class="hero__title text-4xl md:text-6xl pb-4">A Photography Portfolio</p>
          <p class="hero__subtitle text-2xl md:text-3xl italic">Bich Bui</p>
        </div>

      </div>
       -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navbar from './Navbar.vue'

@Component({
  components: {
    Navbar
  }
})
export default class Hero extends Vue {
  array = ['1', '2', '3', '4']
  mounted() {
    /* let count = 1
    const bgImageElement = document.querySelector('.hero__bg-image')
    setInterval(() => {
      count++
      if (count >= this.array.length) {
        count = 1
      }
      bgImageElement?.setAttribute('style', 'background-image: url("' + count + '.jpg");')
    }, 5000) */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero__bg-image {
  transition: background-image 1s ease-in-out 1s;
}
</style>
