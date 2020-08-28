import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children:[
      {
        path: '/ArrToTree',
        name: 'ArrToTree',
        component: () => import('../views/ArrToTree')
      },
      {
        path: '/PaginationAndSearch',
        name: 'PaginationAndSearch',
        component: () => import('../views/PaginationAndSearch')
      },
      {
        path: '/TableSelection',
        name: 'TableSelection',
        component: () => import('../views/TableSelection')
      },
      {
        path: '/ListToExcel',
        name: 'ListToExcel',
        component: () => import('../views/ListToExcel')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
