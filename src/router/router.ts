import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Player from '../components/Player.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Player',
    component: Player
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../components/HistoryPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
