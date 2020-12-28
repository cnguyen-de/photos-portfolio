<template>
  <Navbar />
  <div class="content min-h-screen min-w-screen bg-gray-900">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Navbar from './components/Navbar.vue'

@Options({
  components: {
    Navbar
  }
})
export default class App extends Vue {}
</script>

<style>
@import 'assets/theme.css';
</style>
