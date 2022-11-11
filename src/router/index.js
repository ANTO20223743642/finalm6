import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: '_Inicio_',
    component: HomeView
  },
  {
    path: '/Acercade',
    name: 'Acercade',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Acercade" */ '../views/AboutView.vue')
  },
  {
    path: '/Libros',
    name: 'Libros',
    component: () => import(/* webpackChunkName: "Libros" */ '../views/LibroView.vue')
  },
  {
    path: '/Libros/:id',
    name: 'verLibro',
    component: () => import(/* webpackChunkName: "verLibro" */ '../views/VerLibroView.vue')
  },
  {
    path: '/Libros/:id/editar',
    name: 'editarLibro',
    component: () => import(/* webpackChunkName: "editarLibro" */ '../views/EditarLibroView.vue')
  },
  {
    path: '/Libros',
    name: 'Libros',
    component: () => import(/* webpackChunkName: "Libros" */ '../views/LibroView.vue')
  },
  {
    path: '/Categorias',
    name: 'Categorias',
    component: () => import(/* webpackChunkName: "Categorias" */ '../views/CategoriaView.vue')
  },
  {
    path: '/Categorias/:id',
    name: 'verCategoria',
    component: () => import(/* webpackChunkName: "verCategoria" */ '../views/VerCategoriaView.vue')
  },
  {
    path: '/Categorias/:id/editar',
    name: 'editarCategoria',
    component: () => import(/* webpackChunkName: "editarCategoria" */ '../views/EditarCategoriaView.vue')
  },
  {
    path: '/Categorias',
    name: 'Categorias',
    component: () => import(/* webpackChunkName: "Categorias" */ '../views/CategoriaView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
