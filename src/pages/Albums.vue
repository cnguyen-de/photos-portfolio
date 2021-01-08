<template>
  <div class="text-3xl pt-20 md:pt-4 p-4 pl-4 md:pl-48 text-white flex justify-center">
    <div class="">
      <Albums :albums="albums" :googlePhotos="false" />
    </div>
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
  requiredRenewRequest = false
  requested = false
  created() {
    const ref = firebase.storage.ref('image')
    console.log(ref)
    this.requestPhotos()
  }

  async requestPhotos() {
    await firebase.albums.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // console.log(doc.data())
        // doc.data() is never undefined for query doc snapshots
        const album = doc.data()
        if (album.title.toLowerCase() !== 'homepage' || album.title.toLowerCase() !== 'gallery') {
          const deltaTimeSeconds = Math.floor((Date.now() - album.time) / 1000)
          // console.log(`seconds elapsed = ${deltaTimeSeconds}`)
          if (deltaTimeSeconds > 2000) {
            this.$store.dispatch('photos/getAlbum', album.id)
            this.requiredRenewRequest = true
          } else {
            this.albums.push(album)
          }
        }
      })
      if (this.requiredRenewRequest && !this.requested) {
        console.log('re request')
        this.requestPhotos()
        this.requiredRenewRequest = false
        this.requested = true
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
