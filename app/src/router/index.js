import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FileView from '../views/FileView.vue'

const routes = [
  {
    path: '/tree',
    name: 'tree',
    component: HomeView
  },
  {
    path: '/file',
    name: 'file',
    component: FileView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
