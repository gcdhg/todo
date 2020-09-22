import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
import Home from '@/views/Home'
import Todos from '@/views/Todos'
import Create from '@/views/Create.vue'
// import { component } from 'vue/types/umd'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Todos
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
