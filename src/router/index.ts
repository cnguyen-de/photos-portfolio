import Vue from 'vue'
import VueRouter from 'vue-router'
import Hero from '@/components/Hero.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Hero
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/components/About.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/components/Gallery.vue')
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('@/components/Albums.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
