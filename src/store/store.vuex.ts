import { createProxy, extractVuexModule } from 'vuex-class-component'
import { UserStore } from './modules/user.store'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    ...extractVuexModule(UserStore)
  }
})

export const vxm = {
  user: createProxy(store, UserStore)
}
