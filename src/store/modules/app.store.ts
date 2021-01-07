import { createModule, action, mutation } from 'vuex-class-component'
import i18n from '../../i18n'

const VuexModule = createModule({
  namespaced: 'app',
  strict: false
})

export class AppStore extends VuexModule {
  language = ''

  @action async setLanguage(lang: string) {
    this.setStoreLanguage(lang)
  }

  @mutation setStoreLanguage(lang: string) {
    this.language = lang
    i18n.locale = this.language
    localStorage.setItem('language', lang)
  }

  get getLanguage() {
    return this.language
  }
}
