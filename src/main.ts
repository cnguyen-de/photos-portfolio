import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { store } from './store/store.vuex'
import VueGApi from 'vue-gapi'
import { setBrowserLanguage } from './services/browser-language'
import vmodal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2'
Vue.use(VueSweetalert2)
Vue.use(vmodal, {
  dynamicDefaults: {
    //width: 'auto',
    height: 'auto'
  }
})

Vue.config.productionTip = false

const GOOGLE_OAUTH2_CLIENT_ID = '1015819770341-kjqfvjjqdag1fbmf3m80ms36tl4jdo7j.apps.googleusercontent.com'
Vue.use(VueGApi, {
  discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
  clientId: GOOGLE_OAUTH2_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
})

function fetchLanguage() {
  const savedLanguage = localStorage.getItem('language')
  if (typeof savedLanguage !== 'undefined' && savedLanguage) {
    store.dispatch('app/setLanguage', savedLanguage)
  } else {
    setBrowserLanguage()
  }
}

new Vue({
  created() {
    fetchLanguage()
  },
  render: h => h(App),
  i18n,
  store,
  router
}).$mount('#app')
