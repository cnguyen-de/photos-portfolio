import { createProxy, extractVuexModule } from 'vuex-class-component'
import { UserStore } from './modules/user.store'
import { AppStore } from './modules/app.store'
import { Firestore } from './modules/firestore.store'

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore),
    ...extractVuexModule(AppStore),
    ...extractVuexModule(Firestore)
  }
})

export const vxm = {
  user: createProxy(store, UserStore),
  app: createProxy(store, AppStore),
  firestore: createProxy(store, Firestore)
}
