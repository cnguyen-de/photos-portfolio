<template>
  <div class="hero">
    <div class="hero__image-wrapper min-h-screen min-w-screen" style="min-height: -webkit-fill-available;">
      <img id="hero__image" class="hero__image absolute object-cover h-full w-full" :src="imageSource" />
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
  imageSource = this.array[0] + '.jpg'
  mounted() {
    let count = 1
    setInterval(() => {
      count++
      if (count >= this.array.length) {
        count = 1
      }
      this.imageSource = count + '.jpg'
    }, 5000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hero__image {
  transition: 1s ease-in-out 1s;
}
</style>
