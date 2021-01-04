import { createModule, action, mutation } from 'vuex-class-component'
import { store } from '../store.vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import { USER_SET } from '../actions'

const VuexModule = createModule({
  strict: false
})

export class AppStore extends VuexModule {
  initialized = false

  @mutation setAppInitialized() {
    this.initialized = true
  }

  @action async initApp() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        console.log('init app')
        store.commit(USER_SET, user)
        store.commit('setAppInitialized')
        resolve('done')
      })
    })
  }

  get isAppInitialized() {
    return this.initialized
  }
}
