import { store } from '../store/store.vuex'
import { USER_SET } from '@/store/actions'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyAq-TyAZb7OS_NVETKkKeVE9VCD_PmV2_Q',
  authDomain: 'auth.bichbui.com',
  projectId: 'photos-portfolio-300318',
  storageBucket: 'photos-portfolio-300318.appspot.com',
  messagingSenderId: '1015819770341',
  appId: '1:1015819770341:web:21a627b9b289f8a664f70c',
  measurementId: 'G-4XLTWFS73M'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
firebase.auth()

export function getUser() {
  return firebase.auth().currentUser
}

export function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()
  console.log(provider)
  firebase.auth().languageCode = 'en' //TODO change to selected language
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential

      // The signed-in user info.
      const user = result.user
      store.commit('user/setUser', user)
      console.log('user', user?.displayName)
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

export default { getUser }
