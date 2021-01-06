/* eslint-disable-next-line */
import { createModule, action, mutation } from 'vuex-class-component'
import googlePhotos from '@/services/google-photos'
import Album = gapi.client.photoslibrary.Album
import MediaItem = gapi.client.photoslibrary.MediaItem
const VuexModule = createModule({
  namespaced: 'photos',
  strict: false
})

export class PhotosStore extends VuexModule {
  album: Album | null = null
  albums: Album[] = []
  isSignedIn: boolean | null = null
  mediaItem: MediaItem | null = null
  mediaItems: MediaItem[] = []

  @action async signIn(isSignedIn: boolean) {
    this.setSignedInState(isSignedIn)
  }

  @action async listAlbums() {
    this.setAlbums([])
    return googlePhotos.listAlbums().then(albums => {
      this.setAlbums(albums)
    })
  }

  @mutation setSignedInState(isSignedIn: boolean) {
    this.isSignedIn = isSignedIn

    if (!isSignedIn) {
      this.album = null
      this.albums = []
      this.mediaItems = []
    }
  }

  @mutation setAlbums(albums: Album[]) {
    this.albums = albums
  }
}
