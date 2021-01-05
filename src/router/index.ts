import Vue from 'vue'
import VueRouter from 'vue-router'
import Hero from '@/components/Hero.vue'
import { getUser } from '../services/firebase'
import { store } from '../store/store.vuex'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Hero
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/pages/Gallery.vue')
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('@/pages/Albums.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/photos-manager',
    name: 'photos-manager',
    component: () => import('@/pages/PhotosManager.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

const storeInit = store.dispatch('user/initApp')
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!requiresAuth) {
    next()
  } else {
    storeInit.then(() => {
      const currentUser = getUser()
      if (!currentUser) {
        next('/login')
      } else {
        next()
      }
    })
  }
})
export default router
