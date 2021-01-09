import { createModule, action, mutation } from 'vuex-class-component'
import i18n from '../../i18n'
import fb from 'firebase/app'
import Photo = fb.firestore.DocumentData

const VuexModule = createModule({
  namespaced: 'app',
  strict: false
})

export class AppStore extends VuexModule {
  language = ''
  selectedPhotoManagerComponent = ''
  isDisplayingFullscreenImage = false
  selectedFullscreenImage: Photo = {}

  @action async setLanguage(lang: string) {
    this.setStoreLanguage(lang)
  }

  @action async setSelectedPhotoManagerComponent(component: string) {
    this.setComponent(component)
  }

  @mutation setSelectedPhoto(photo: Photo) {
    this.selectedFullscreenImage = photo
  }

  @mutation toggleFullscreenImage(isDisplayingFullscreenImage: boolean) {
    const body = document.querySelector('body')

    this.isDisplayingFullscreenImage = isDisplayingFullscreenImage
    if (isDisplayingFullscreenImage) {
      if (body) body.style.overflow = 'hidden'
    } else {
      if (body) body.style.overflow = 'auto'
    }
  }

  @mutation setStoreLanguage(lang: string) {
    this.language = lang
    i18n.locale = this.language
    localStorage.setItem('language', lang)
  }

  @mutation setComponent(component: string) {
    this.selectedPhotoManagerComponent = component
  }

  get getLanguage() {
    return this.language
  }
}
