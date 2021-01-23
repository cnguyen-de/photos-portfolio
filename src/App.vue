<template>
  <div id="app">
    <div class="content min-h-screen min-w-screen bg-gray-900 select-none" style="min-height: -webkit-fill-available">
      <Navbar />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navbar from './components/Navbar.vue'

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {}
</script>

<style>
@import 'assets/theme.css';

.fade-enter-active,
.fade-leave-active {
  max-height: 100%;
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
