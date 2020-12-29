import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Hero from '@/components/Hero.vue'

const routes: Array<RouteRecordRaw> = [
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
