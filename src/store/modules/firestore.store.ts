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

  @action async getGalleryPhotos() {
    console.log('dispatch gallery photos')

    this.galleryPhotos = []
    firebase.gallery.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        this.addGalleryPhoto(doc.data())
      })
    })
  }

  @action async getAlbums() {
    console.log('dispatch albums')

    this.albums = []
    firebase.albums.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        const album = doc.data()
        this.addAlbum(album)
      })
    })
  }

  @action async createAlbum(title: string) {
    console.log('dispatch create album ', title)
    const newAlbum = {
      id: 'album' + Date.now(),
      title,
      photos: []
    }
    firebase.albums.doc(newAlbum.id).set(newAlbum)
  }

  @mutation addAlbum(album: Photo) {
    console.log(this.albums.some(photoInArray => photoInArray.title === album.title))
    if (!this.albums.some(photoInArray => photoInArray.title === album.title)) {
      this.albums.push(album)
    }
  }

  @mutation addGalleryPhoto(photo: Photo) {
    if (!this.galleryPhotos.some(photoInArray => photoInArray.name === photo.name)) {
      this.galleryPhotos.push(photo)
    }
  }

  @mutation addHomepagePhoto(photo: Photo) {
    if (!this.homepagePhotos.some(photoInArray => photoInArray.name === photo.name)) {
      this.homepagePhotos.push(photo)
    }
  }
}
