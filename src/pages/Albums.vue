<template>
  <div class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex justify-center">
    {{ $t('placeholder') }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Albums from '../components/GooglePhotosAlbum.vue'
import firebase from '../services/firebase'
import fb from 'firebase/app'
import Album = fb.firestore.DocumentData

@Component({ components: { Albums } })
export default class About extends Vue {
  albums: Array<Album> = []
  created() {
    firebase.albums.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data().album.title.toLowerCase() !== 'homepage' || doc.data().album.title.toLowerCase() !== 'gallery') {
          this.albums.push(doc.data().album)
        }
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
