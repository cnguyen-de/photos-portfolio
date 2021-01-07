<template>
  <div class="hero relative min-h-screen h-screen min-w-screen grid place-items-center">
    <div class="stories">
      <section class="user" v-for="img of array" :key="img" ref="img" @click="click($event)">
        <article class="story" :style="'background-image: url(' + img + ');'"></article>
      </section>
    </div>
    <span
      class="absolute right-0 top-1/2 z-50 mr-10 animate-bounce"
      @click="navigateStories('next')"
      v-if="isDisplayingArrows"
    >
      <svg
        class="h-8 w-8 md:h-16 md:w-16 text-white opacity-70 cursor-pointer"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 14l7-6.5L5 1" stroke="currentColor" stroke-linecap="square"></path>
      </svg>
    </span>
    <span
      class="absolute left-0 top-1/2 z-50 ml-10 md:ml-52 animate-bounce"
      @click="navigateStories('prev')"
      v-if="isDisplayingArrows"
    >
      <svg
        class="h-8 w-8 md:h-16 md:w-16 text-white opacity-70 cursor-pointer"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 14L3 7.5 10 1" stroke="currentColor" stroke-linecap="square"></path>
      </svg>
    </span>
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
  isDisplayingArrows = true
  index = 0
  autoScroll = setInterval(() => {
    this.navigateStories('next', true)
  }, 10000)

  scrollListener = document.addEventListener('wheel', e => {
    clearInterval(this.autoScroll)
  })

  mounted() {
    this.stories = this.$el.querySelector('.stories')
    this.arrayStory = this.$el.querySelectorAll('.story')
  }

  click($event: MouseEvent) {
    if (this.stories instanceof HTMLElement) {
      clearInterval(this.autoScroll)
      const median = window.innerWidth / 2
      this.navigateStories($event.clientX > median ? 'next' : 'prev')
    }
  }

  navigateStories(direction: string, force? = false) {
    this.isDisplayingArrows = false

    if (direction === 'next') {
      if (this.index < this.arrayStory.length - 1) {
        this.index++
      } else {
        if (force) this.index = 0
      }
      this.arrayStory[this.index].scrollIntoView({ behavior: 'smooth' })
    } else if (direction === 'prev') {
      if (this.index > 0) {
        this.index--
      } else {
        if (force) this.index = this.arrayStory.length - 1
      }
      this.arrayStory[this.index].scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
