import { createModule, action, mutation } from 'vuex-class-component'
import i18n from '../../i18n'

const VuexModule = createModule({
  namespaced: 'app',
  strict: false
})

export class AppStore extends VuexModule {
  language = ''
  selectedPhotoManagerComponent = ''

  @action async setLanguage(lang: string) {
    this.setStoreLanguage(lang)
  }

  @action async setSelectedPhotoManagerComponent(component: string) {
    this.setComponent(component)
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
