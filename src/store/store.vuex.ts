import { createProxy, extractVuexModule } from 'vuex-class-component'
import { UserStore } from './modules/user.store'
import { AppStore } from './modules/app.store'
import { PhotosStore } from './modules/photos.store'
import { Firestore } from './modules/firestore.store'

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore),
    ...extractVuexModule(PhotosStore),
    ...extractVuexModule(AppStore),
    ...extractVuexModule(Firestore)
  }
})

export const vxm = {
  user: createProxy(store, UserStore),
  photos: createProxy(store, PhotosStore),
  app: createProxy(store, AppStore),
  firestore: createProxy(store, Firestore)
}
