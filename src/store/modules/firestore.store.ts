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
  selectedAlbumTitle = ''
  albumPhotos: Photo[] = []
  selectedAlbum: Album | undefined = undefined

  @action async getHomepagePhotos() {
    this.homepagePhotos = []
    firebase.homepage.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        this.addHomepagePhoto(doc.data())
      })
    })
  }

  @action async addHomepagePhotos(photo: Photo, url?: string) {
    if (typeof url === 'undefined') {
      // add existed photo
      firebase.homepage.doc(photo.id).set(photo)
    } else {
      // add just uploaded photo
      const id = 'photo' + Date.now()
      firebase.homepage.doc(id).set({ id, name: photo.name, url })
    }
  }

  @action async getGalleryPhotos() {
    this.galleryPhotos = []
    firebase.gallery.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        this.addGalleryPhoto(doc.data())
      })
    })
  }

  @action async addGalleryPhotos(photo: Photo, url?: string) {
    if (typeof url === 'undefined') {
      // add existed photo
      firebase.gallery.doc(photo.id).set(photo)
    } else {
      // add just uploaded photo
      const id = 'photo' + Date.now()
      firebase.gallery.doc(id).set({ id, name: photo.name, url })
    }
  }

  @action async getAlbums() {
    this.albums = []
    firebase.albums.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        const album = doc.data()
        this.addAlbum(album)
      })
    })
  }

  @action async getAlbumPhotos(albumId: string) {
    this.albumPhotos = []
    this.selectedAlbum = undefined
    firebase.albums
      .doc(albumId)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.updateSelectedTitle(doc.data()?.title)
          this.updateSelectedAlbum(doc.data())
          if (doc.data()?.photos) {
            this.albumPhotos = doc.data()?.photos
          }
        } else {
          console.log('Cannot find album')
        }
      })
  }

  @action async updateAlbumDescription(albumDescription: string) {
    firebase.albums
      .doc(this.selectedAlbum?.id)
      .update({
        description: albumDescription
      })
      .then(() => {
        console.log('done')
      })
  }

  @action async createAlbum(title: string) {
    const newAlbum = {
      id: 'album' + Date.now(),
      description: `Album Description: ${title}`,
      title,
      photos: []
    }
    firebase.albums.doc(newAlbum.id).set(newAlbum)
  }

  /*   @mutation addSelectedAlbumPhoto(photo: Photo) {
    if (!this.albumPhotos.some(photoInArray => photoInArray.id === photo.id)) {
      this.albumPhotos.push(photo)
    }
  } */
  @mutation updateSelectedAlbum(album: Album | undefined) {
    this.selectedAlbum = album
  }

  @mutation updateSelectedTitle(title: string) {
    this.selectedAlbumTitle = title
  }

  @mutation addAlbum(album: Photo) {
    if (!this.albums.some(photoInArray => photoInArray.title === album.title)) {
      this.albums.push(album)
    }
  }

  @mutation addGalleryPhoto(photo: Photo) {
    if (!this.galleryPhotos.some(photoInArray => photoInArray.id === photo.id)) {
      this.galleryPhotos.push(photo)
    }
  }

  @mutation addHomepagePhoto(photo: Photo) {
    if (!this.homepagePhotos.some(photoInArray => photoInArray.id === photo.id)) {
      this.homepagePhotos.push(photo)
    }
  }
}
