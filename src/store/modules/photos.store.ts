/* eslint-disable-next-line */
import { createModule, action, mutation } from 'vuex-class-component'

const VuexModule = createModule({
  strict: false
})

export class PhotosStore extends VuexModule {
  photos = []
}
