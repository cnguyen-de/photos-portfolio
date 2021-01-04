import { createProxy, extractVuexModule } from 'vuex-class-component'
import { UserStore } from './modules/user.store'
import { AppStore } from './modules/app.store'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore),
    ...extractVuexModule(AppStore)
  }
})

export const vxm = {
  user: createProxy(store, UserStore),
  app: createProxy(store, AppStore)
}
