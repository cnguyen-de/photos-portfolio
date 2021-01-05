import { createModule, action, mutation } from 'vuex-class-component'
import { USER_LOGIN, USER_LOGOUT, USER_SET } from '../actions'
import { loginWithGoogle } from '../../services/firebase'

import firebase from 'firebase/app'
import 'firebase/auth'

const VuexModule = createModule({
  strict: false
})

export class UserStore extends VuexModule {
  username: firebase.User | null = null
  initialized = false

  @mutation setAppInitialized() {
    this.initialized = true
  }

  @action async initApp() {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        this[USER_SET](user)
        this.setAppInitialized()
        resolve('done')
      })
    })
  }

  get isAppInitialized() {
    return this.initialized
  }

  @mutation [USER_SET](user: firebase.User | null) {
    this.username = user
  }

  @action async [USER_LOGIN]() {
    loginWithGoogle()
  }

  @action async [USER_LOGOUT]() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this[USER_SET](null)
        console.log('logged out')
      })
      .catch(error => {
        console.log(error)
      })
  }

  get getUser() {
    return this.username
  }
}
