import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import ComponenteMenu from '../views/ComponenteMenu.vue'
import ComponenteInicio from '../views/ComponenteInicio.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/menu',
    name: 'ComponenteMenu',
    component: ComponenteMenu
  },
  {
    path: '/inicio',
    name: 'ComponenteInico',
    component: ComponenteInicio
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
