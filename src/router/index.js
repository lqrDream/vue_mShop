import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Home  = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: () => import('../views/cart/Cart')
  },
  {
    path: '/profile',
    component: () => import('../views/profile/Profile')
  },
  {
    path: '/detail/:iid',
    component: () => import('../views/detail/Detail')
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
