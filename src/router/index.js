import Vue from 'vue'
import Router from 'vue-router'
import Usuarios from '@/components/Usuarios'
import UsuarioPage from '@/components/UsuarioPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Usuarios',
      component: Usuarios
    },
    {
      path: '/usuario/:id',
      name: 'UsuarioPage',
      component: UsuarioPage
    }
  ]
})
