import { createModule, action, mutation } from 'vuex-class-component'
import firebase from 'firebase/app'
import 'firebase/auth'

const VuexModule = createModule({
  strict: false
})

export class AppStore extends VuexModule {
  initialized = false

  @mutation setAppInitialized() {
    this.initialized = true
  }

  get isAppInitialized() {
    return this.initialized
  }
}
