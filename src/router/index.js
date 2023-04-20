import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRoutes = [
  {
    path: "/",
    // redirect重定向,自动跳转至
    redirect: "/login"
  },
  //登录
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  //注册
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },
]
import homePage from './modules/homePage'
export const asyncRoutes = [
  homePage,
]
const createRouter = () => new Router({
  // mode: 'history', // hash history
  scrollBehavior: () => ({ y: 0 }),
  // base:'/audienceWeb',
  routes: [...constantRoutes,...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
