/* eslint-disable-next-line */
import { createModule, action, mutation } from 'vuex-class-component'
import googlePhotos from '@/services/google-photos'
import Album = gapi.client.photoslibrary.Album
import MediaItem = gapi.client.photoslibrary.MediaItem

import firebase from '../../services/firebase'

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

  @action async searchMediaItems(albumId: string, pageToken?: string) {
    googlePhotos.searchMediaItems(albumId, pageToken).then(response => {
      if (typeof response.mediaItems !== 'undefined') {
        if (pageToken) {
          this.addMediaItems(response.mediaItems)
        } else {
          this.setMediaItems(response.mediaItems)
          firebase.albums.doc(albumId).update({ photos: response.mediaItems })
        }
      }

      const nextPageToken = response.nextPageToken

      if (nextPageToken) {
        this.searchMediaItems(albumId, nextPageToken)
      }
    })
  }

  @action async getAlbum(albumId?: string) {
    if (!albumId) {
      return this.setAlbum(null)
    }

    return new Promise<Album | null>(resolve => {
      const album = this.albums.find(album => {
        return albumId === album.id
      })

      if (album) {
        resolve(album)
      } else {
        googlePhotos.getAlbum(albumId).then(resolve)
      }
    }).then(album => {
      this.setAlbum(album)
      if (album) {
        firebase.albums.doc(album.id).set({ ...album, ...{ time: Date.now() } })
      }
      this.searchMediaItems(albumId)
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

  @mutation setAlbum(album: Album | null) {
    this.album = album
    console.log('set album', album)
    this.mediaItems = []
  }

  @mutation setMediaItems(mediaItems: MediaItem[]) {
    this.mediaItems = mediaItems
    console.log('set media items', mediaItems)
  }

  @mutation addMediaItems(mediaItems: MediaItem[]) {
    this.mediaItems = this.mediaItems.concat(mediaItems)
  }

  @mutation setMediaItem(mediaItem: MediaItem) {
    this.mediaItem = mediaItem
  }

  get getMediaItems() {
    console.log(this.mediaItems)
    return this.mediaItems
  }
}
