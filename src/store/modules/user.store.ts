import { createModule, action } from 'vuex-class-component'
import { USER_LOGIN, USER_LOGOUT } from '../actions'
import firebase from 'firebase/app'
import 'firebase/auth'

const VuexModule = createModule({
  strict: false
})

export class UserStore extends VuexModule {
  username: string | null | undefined = null

  @action async [USER_LOGIN]() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().languageCode = 'en' //TODO change to selected language
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential

        // The signed-in user info.
        const user = result.user
        this.username = user?.displayName
        // ...
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
        this.username = ''
      })
      .catch(error => {
        console.log(error)
      })
  }

  get getUser() {
    const user = firebase.auth().currentUser
    console.log(user)
    return user
  }
}
