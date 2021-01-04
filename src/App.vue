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
import firebase from 'firebase/app'
import 'firebase/auth'
import { USER_SET } from './store/actions'

@Component({
  components: {
    Navbar
  }
})
export default class App extends Vue {
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.commit(USER_SET, user)
      }
    })
  }
}
</script>

<style>
@import 'assets/theme.css';
</style>
