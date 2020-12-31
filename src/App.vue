<template>
  <div id="app">
    <Navbar />
    <div class="content min-h-screen min-w-screen bg-gray-900 select-none">
      <router-view />
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
</style>
