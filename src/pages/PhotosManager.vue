<template>
  <div class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex justify-center text-justify">
    Photos Manager
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { store } from '../store/store.vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import { USER_SET } from '../store/actions'

@Component({
  beforeRouteEnter(to, from, next) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.commit(USER_SET, user)
        next()
      } else {
        next('/login')
      }
    })
    unsubscribe()
  }
})
export default class PhotosManager extends Vue {
  mounted() {
    console.log('mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
