import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import Tabs from '../views/Tabs.vue'
import ComponenteMenu from '../views/ComponenteMenu.vue'
import ComponenteInicio from '../views/ComponenteInicio.vue'
import ComponenteEditor from '../views/ComponenteEditor.vue'
import ComponenteArchivo from '../views/ComponenteArchivo.vue'
import ComponenteNotas from '../views/ComponenteNotas.vue'
import ComponenteExamen from '../views/ComponenteExamen.vue'
import ComponenteExamenCreado from '../views/ComponenteExamenCreado.vue'
import ComponenteEditarCarpeta from '../views/ComponenteEditarCarpeta.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/inicio'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/editarCarpeta',
    name: 'ComponenteEditarCarpeta',
    component: ComponenteEditarCarpeta
  },
  {
    path: '/menu',
    name: 'ComponenteMenu',
    component: ComponenteMenu
  },
  {
    path: '/notas',
    name: 'ComponenteNotas',
    component: ComponenteNotas
  },
  {
    path: '/editor',
    name: 'ComponenteEditor',
    component: ComponenteEditor
  },
  {
    path: '/creadorExamen',
    name: 'ComponenteExamen',
    component: ComponenteExamen
  },
  {
    path: '/examenCreado',
    name: 'ComponenteExamenCreado',
    component: ComponenteExamenCreado
  },
  {
    path: '/tabs/',
    name: 'Tabs',
    component: Tabs,
    children: [
      {
        path: 'inicio',
        name: 'ComponenteInicio',
        component: ComponenteInicio
      },
      {
        path: 'archivo',
        name: 'ComponenteArchivo',
        component: ComponenteArchivo
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
