import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { store } from './store/store.vuex'
import VueGApi from 'vue-gapi'
import googlePhotos from '@/services/google-photos'

Vue.config.productionTip = false

const GOOGLE_OAUTH2_CLIENT_ID = '1015819770341-kjqfvjjqdag1fbmf3m80ms36tl4jdo7j.apps.googleusercontent.com'
Vue.use(VueGApi, {
  discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
  clientId: GOOGLE_OAUTH2_CLIENT_ID,
  scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
})

new Vue({
  created() {
    googlePhotos.initialize(this.$gapi)
  },
  render: h => h(App),
  i18n,
  store,
  router
}).$mount('#app')
