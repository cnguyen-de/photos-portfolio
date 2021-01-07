import { createModule, action, mutation } from 'vuex-class-component'
import { USER_LOGIN, USER_LOGOUT, USER_SET } from '../actions'

import firebase from 'firebase/app'

const VuexModule = createModule({
  strict: false,
  namespaced: 'user'
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
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().languageCode = 'en' //TODO change to selected language
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        //const credential = result.credential
        // The signed-in user info.
        const user = result.user
        this[USER_SET](user)
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential
        console.log(errorCode, errorMessage, email, credential)

        // ...
      })
  }

  @action async [USER_LOGOUT]() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this[USER_SET](null)
      })
      .catch(error => {
        console.log(error)
      })
  }

  get getUser() {
    console.log(this.username)
    return this.username
  }
}
