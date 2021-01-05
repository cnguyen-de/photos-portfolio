<template>
  <div class="hero min-h-screen h-screen min-w-screen grid place-items-center">
    <div class="stories">
      <section class="user" v-for="img of array" :key="img" ref="img" @click="click($event)">
        <article class="story" :style="'background-image: url(' + img + ');'"></article>
      </section>
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
  array = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg']
  stories: HTMLElement | null = null
  arrayStory: NodeListOf<HTMLElement> = document.querySelectorAll('.story')
  index = 0

  mounted() {
    this.stories = this.$el.querySelector('.stories')
    this.arrayStory = this.$el.querySelectorAll('.story')
    setInterval(() => {
      this.navigateStories('next')
    }, 7500)
  }

  click($event: MouseEvent) {
    if (this.stories instanceof HTMLElement) {
      const median = window.innerWidth / 2
      this.navigateStories($event.clientX > median ? 'next' : 'prev')
    }
  }
  navigateStories(direction: string) {
    if (direction === 'next') {
      if (this.index < this.arrayStory.length - 1) {
        this.index++
      } else {
        this.index = 0
      }
      this.arrayStory[this.index].scrollIntoView({ behavior: 'smooth' })
    } else if (direction === 'prev') {
      if (this.index > 0) {
        this.index--
      } else {
        this.index = this.arrayStory.length - 1
      }
      this.arrayStory[this.index].scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hero {
}
.stories {
  position: relative;

  display: grid;
  grid: 1fr / auto-flow 100%;
  gap: 1ch;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior: contain;
  touch-action: pan-x;

  inline-size: 100vw;
  block-size: 100vh;
  scrollbar-width: none; /* Firefox */
}
::-webkit-scrollbar {
  /* Chrome & Safari */
  display: none;
}

.user {
  /* outer */
  scroll-snap-align: start;
  scroll-snap-stop: always;

  /* inner */
  display: grid;
  grid: [story] 1fr / [story] 1fr;
}

.story {
  grid-area: story;

  background-size: cover;
  background-position: center;
  //background-image: var(--bg), linear-gradient(to top, lch(98 0 0), lch(90 0 0));

  user-select: none;
  touch-action: manipulation;

  transition: opacity 0.3s cubic-bezier(0.4, 0, 1, 1);

  &.seen {
    opacity: 0;
    pointer-events: none;
  }
}
</style>
