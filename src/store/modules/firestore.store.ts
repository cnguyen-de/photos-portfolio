import { createModule, action, mutation } from 'vuex-class-component'
import firebase from '../../services/firebase'
import fb from 'firebase/app'
import Photo = fb.firestore.DocumentData
import Album = fb.firestore.DocumentData

const VuexModule = createModule({
  namespaced: 'firestore',
  strict: false
})

export class Firestore extends VuexModule {
  homepagePhotos: Photo[] = []
  galleryPhotos: Photo[] = []
  albums: Album[] = []

  @action async getHomepagePhotos() {
    console.log('dispatch homepage photos')

    this.homepagePhotos = []
    firebase.homepage.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        this.addHomepagePhoto(doc.data())
      })
    })
  }

  @mutation addHomepagePhoto(photo: Photo) {
    if (!this.homepagePhotos.some(photoInArray => photoInArray.name === photo.name)) {
      this.homepagePhotos.push(photo)
    }
  }
}
