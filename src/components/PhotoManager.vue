<template>
  <div class="">
    <AlbumDescriptionManager class="mt-4" v-if="currentComponent === 'albums'" />
    <div class="h-full w-full flex flex-row flex-wrap">
      <div v-for="photo of photos" :key="photo.id">
        <div
          class="photos__photo relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex items-center justify-center bg-gray-800"
          @click="selectPhoto(photo)"
          :class="{ ' border-4 border-blue-400': isPhotoSelected(photo) }"
        >
          <Check class="absolute left-0 top-0 mt-1 ml-1 z-50" v-if="isPhotoSelected(photo)" />
          <img
            :src="photo.url"
            alt=""
            class="photo absolute h-full w-full object-cover rounded-md"
            :class="{ selected: isPhotoSelected(photo) }"
            v-if="photo.url"
          />
        </div>
      </div>
      <div v-for="(photo, index) of previewPhotos" :key="photo.id" :class="{ hidden: previewPhotos.length === 0 }">
        <div
          class="photos__preview-photo relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex justify-center items-center bg-gray-800"
        >
          <div class="relative h-4 w-full mx-4 rounded-full bg-gray-900">
            <div
              class="min-w-min h-4 bg-blue-400 rounded-full"
              :ref="`photo-${index}`"
              :style="'width: ' + previewPhotos[index].progress + '%'"
              v-if="!previewPhotos[index].url"
            ></div>
          </div>
          <img
            :src="previewPhotos[index].url"
            alt=""
            class="absolute h-full w-full object-cover rounded-md"
            v-if="previewPhotos[index].url"
          />
        </div>
      </div>

      <div
        class="photos__upload relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-100"
        @click="$refs.fileUpload.click()"
      >
        <input
          ref="fileUpload"
          class="hidden"
          title="Upload new photo"
          type="file"
          multiple
          accept="image/*"
          @change="onFileChange($event)"
        />
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
        <span class="mt-4 text-sm text-center">{{ $t('album.uploadPhoto') }}</span>
      </div>
      <div
        class="photos__upload relative h-40 md:h-64 w-40 md:w-64 my-4 mr-4 cursor-pointer rounded-md flex flex-col items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-gray-100"
        @click="addFile()"
        v-if="currentComponent !== 'albums'"
      >
        <svg class="h-8 w-8" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 1v13M1 7.5h13" stroke="currentColor"></path>
        </svg>
        <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          ></path>
        </svg>
        <span class="mt-4 text-sm text-center">{{ $t('album.addPhoto') }}</span>
      </div>

      <div
        class="photos__delete fixed flex flex-row transition duration-150 ease-linear right-0 bottom-0 bg-blue-600 hover:bg-blue-500 focus:outline-none px-6 py-2 text-base font-bold mr-8 mb-8 rounded-full appearance-none outline-none"
        @click="deleteImages()"
        v-if="selected.length !== 0"
      >
        <svg
          class="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          ></path>
        </svg>
        <button>{{ $t('album.photoDeleteAction') }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import AlbumDescriptionManager from '@/components/AlbumDescriptionManager.vue'
import Check from './Check.vue'
import firebase from '../services/firebase'
import fb from 'firebase/app'
import FieldValue = fb.firestore.FieldValue
import Photo = fb.firestore.DocumentData
import { PhotoUpload } from '../types/PhotoUpload'
import { vxm } from '@/store/store.vuex'
import PhotoChooser from './PhotoChooser.vue'

@Component({
  components: { Check, AlbumDescriptionManager, PhotoChooser }
})
export default class Albums extends Vue {
  previewPhotos: PhotoUpload[] = []
  selected: Photo[] = []
  firebaseTarget: fb.firestore.CollectionReference<Photo> = firebase.homepage
  getFirestorePhotosAction = ''
  getFirestorePhotosActionParam = ''
  photos: Photo[] = []

  created() {
    this.$store.dispatch('app/setSelectedPhotoManagerComponent', 'albums')
    this.updateValues()
  }

  addFile() {
    this.$modal.show(PhotoChooser, { width: 300, height: 300 }, { 'before-close': this.beforeModalClose })
  }

  beforeModalClose() {
    this.$store.dispatch(this.getFirestorePhotosAction, this.getFirestorePhotosActionParam)
  }

  onFileChange() {
    const files: ReadonlyArray<File> = [...(this.upload.files ? this.upload.files : [])]
    let index = 0
    files.forEach(file => {
      this.previewPhotos.push({ url: null, progress: 0 })

      const storageRef = firebase.storage.ref(`${file.name}`).put(file)
      storageRef.on(
        `state_changed`,
        () => {
          this.previewPhotos[index].progress = this.previewPhotos[index].progress + 5
        },
        error => {
          console.log(error.message)
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.previewPhotos[index].url = url
            if (this.currentComponent !== 'albums') {
              this.firebaseTarget.doc(file.name).set({ id: 'photo' + Date.now(), name: file.name, url })
            } else {
              this.firebaseTarget.doc(this.getFirestorePhotosActionParam).update({
                photos: FieldValue.arrayUnion({ id: 'photo' + Date.now(), name: file.name, url: url })
              })
            }
            if (index === files.length - 1) {
              this.$store.dispatch(this.getFirestorePhotosAction, this.getFirestorePhotosActionParam)
              this.previewPhotos = []
              return
            }
            index++
          })
        }
      )
    })
  }

  /** Upload element */
  get upload(): HTMLInputElement {
    return this.$refs.fileUpload as HTMLInputElement
  }

  deleteImages() {
    if (this.currentComponent !== 'albums') {
      this.selected.forEach((photo, index) => {
        this.firebaseTarget
          .doc(photo?.id)
          .delete()
          .then(() => {
            if (index === this.selected.length - 1) {
              this.selected = []
              this.$store.dispatch(this.getFirestorePhotosAction, this.getFirestorePhotosActionParam)
              this.$swal({
                position: 'bottom',
                text: this.$tc('album.photoDeleted', this.selected.length),
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
      })
    } else {
      this.selected.forEach((photo, index) => {
        this.firebaseTarget
          .doc(this.getFirestorePhotosActionParam)
          .update({
            photos: FieldValue.arrayRemove({ id: photo.id, name: photo.name, url: photo.url })
          })
          .then(() => {
            if (index === this.selected.length - 1) {
              this.$store.dispatch(this.getFirestorePhotosAction, this.getFirestorePhotosActionParam)
              this.$swal({
                position: 'bottom',
                text: this.$tc('album.photoDeleted', this.selected.length),
                showConfirmButton: false,
                timer: 1500
              })
              this.selected = []
            }
          })
      })
    }
  }

  selectPhoto(photo: Photo) {
    if (!this.isPhotoSelected(photo)) {
      this.selected.push(photo)
    } else {
      const index = this.selected.indexOf(photo)
      if (index > -1) {
        this.selected.splice(index, 1)
      }
    }
  }

  @Watch('selected')
  isPhotoSelected(photo: Photo): boolean {
    return this.selected.includes(photo)
  }

  @Watch('homepagePhotos')
  updateHomepagePhotos() {
    if (this.currentComponent === 'homepage') this.photos = this.homepagePhotos
  }
  get homepagePhotos() {
    return vxm.firestore.homepagePhotos
  }

  @Watch('galleryPhotos')
  updateGalleryPhotos() {
    if (this.currentComponent === 'gallery') this.photos = this.galleryPhotos
  }
  get galleryPhotos() {
    return vxm.firestore.galleryPhotos
  }

  @Watch('albumPhotos')
  updateAlbumsPhotos() {
    if (this.currentComponent === 'albums') this.photos = this.albumPhotos
  }
  get albumPhotos() {
    return vxm.firestore.albumPhotos
  }

  @Watch('currentComponent')
  updateValues() {
    switch (this.currentComponent) {
      case 'homepage':
        this.firebaseTarget = firebase.homepage
        this.getFirestorePhotosAction = 'firestore/getHomepagePhotos'
        break
      case 'gallery':
        this.firebaseTarget = firebase.gallery
        this.getFirestorePhotosAction = 'firestore/getGalleryPhotos'
        break
      case 'albums':
        this.firebaseTarget = firebase.albums
        this.getFirestorePhotosAction = 'firestore/getAlbumPhotos'
        this.getFirestorePhotosActionParam = this.$route.path.split('/').slice(-1)[0]
        break
      default:
        break
    }
    this.$store.dispatch(this.getFirestorePhotosAction, this.getFirestorePhotosActionParam)
  }

  get currentComponent() {
    return vxm.app.selectedPhotoManagerComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.photo {
  transform: scale(1);
  transition: all 0.1s ease-in-out;
}
.selected {
  transform: scale(0.9);
  transition: all 0.1s ease-in-out;
}
</style>
