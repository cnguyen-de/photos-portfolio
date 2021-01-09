import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
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
const fbAuth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const homepage = db.collection('homepage')
const gallery = db.collection('gallery')
const albums = db.collection('albums')

export function getUser() {
  return firebase.auth().currentUser
}

export default { getUser, firebase, fbAuth, db, albums, homepage, gallery, storage }
