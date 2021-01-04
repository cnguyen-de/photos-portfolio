import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { store } from './store/store.vuex'

new Vue({
  render: h => h(App),
  i18n,
  store,
  router
}).$mount('#app')
