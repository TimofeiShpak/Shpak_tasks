import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { PATH_EDIT_PROFILE, PATH_AUTHORIZATION, PATH_HOME, 
  PATH_LOADING } from '../store/helpers/constants'
import Loading from '../components/pages/Loading.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: PATH_AUTHORIZATION,
    name: 'Authorization',
    component: () => import('../components/pages/Authorization.vue')
  },
  {
    path: PATH_HOME,
    name: 'Home',
    component: () => import('../components/pages/Home.vue')
  },
  {
    path: PATH_EDIT_PROFILE,
    name: 'Edit Profile',
    component: () => import('../components/pages/EditProfile.vue')
  },
  {
    path: PATH_LOADING,
    name: 'Loading',
    component: Loading,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router