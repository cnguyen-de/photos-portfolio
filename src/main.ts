import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/auth'

Vue.config.productionTip = false

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
Vue.prototype.$analytics = firebase.analytics()
Vue.prototype.$auth = firebase.auth()

new Vue({
  render: h => h(App),
  i18n,
  router
}).$mount('#app')
