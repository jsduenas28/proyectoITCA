import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import Tabs from '../views/Tabs.vue'
import ComponenteMenu from '../views/ComponenteMenu.vue'
import ComponenteInicio from '../views/ComponenteInicio.vue'
import ComponenteEditor from '../views/ComponenteEditor.vue'
import ComponenteArchivo from '../views/ComponenteArchivo.vue'
import ComponenteExamen from '../views/ComponenteExamen.vue'
import ComponenteNotas from '../views/ComponenteNotas.vue'
import ComponenteEditarCarpeta from '../views/ComponenteEditarCarpeta.vue'
import ComponenteNuevaCarpeta from '../views/ComponenteNuevaCarpeta.vue'
import ComponenteExamenCreado from '../views/ComponenteExamenCreado.vue'
import ComponenteEditorUpdate from '../views/ComponenteEditorUpdate.vue'
import ComponenteUsuario from '../views/ComponenteUsuario.vue'
import ComponenteBusqueda from '../views/ComponenteBusqueda.vue'

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
    path: '/editor/:carpeta',
    name: 'ComponenteEditor',
    component: ComponenteEditor
  },
  {
    path: '/editorUpdate/:nota',
    name: 'ComponenteEditorUpdate',
    component: ComponenteEditorUpdate
  },
  {
    path: '/editarCarpeta/:id',
    name: 'ComponenteEditarCarpeta',
    component: ComponenteEditarCarpeta
  },
  {
    path: '/nuevaCarpeta',
    name: 'ComponenteNuevaCarpeta',
    component: ComponenteNuevaCarpeta
  },
  {
    path: '/crearExamen',
    name: 'ComponenteExamen',
    component: ComponenteExamen
  },
  {
    path: '/examenCreado/:nota',
    name: 'ComponenteExamenCreado',
    component: ComponenteExamenCreado
  },
  {
    path: '/crearNotas',
    name: 'ComponenteNotas',
    component: ComponenteNotas
  },
  {
    path: '/usuario',
    name: 'ComponenteUsuario',
    component: ComponenteUsuario
  },
  {
    path: '/busqueda',
    name: 'ComponenteBusqueda',
    component: ComponenteBusqueda
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
