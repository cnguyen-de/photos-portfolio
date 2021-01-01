import Vue from 'vue'
import VueRouter from 'vue-router'
import Hero from '@/components/Hero.vue'

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
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
