import { createModule, action, mutation } from 'vuex-class-component'
import { store } from '../store.vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import { USER_SET } from '../actions'

const VuexModule = createModule({
  strict: false
})

export class AppStore extends VuexModule {}
