import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Create from '../views/CreateView.vue'
import Edit from '../views/EditView.vue'
import TableView from '../views/TableView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/table',
    name: 'table',
    component: TableView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
