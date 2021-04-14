import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/authorization',
    name: 'Authorization',
    component: () => import('../components/authorization/Authorization.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
