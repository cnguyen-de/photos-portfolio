<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="min-h-screen min-w-screen bg-gray-900">test</div>
  <HelloWorld />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import HelloWorld from './components/HelloWorld.vue'

@Options({
  components: {
    HelloWorld
  }
})
export default class App extends Vue {}
</script>

<style>
@import 'assets/theme.css';
</style>
