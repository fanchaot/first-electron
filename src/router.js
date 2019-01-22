import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'
import store from './store';

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      meta: {auth: true},
      component: About
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    }
  ]
})
router.beforeEach((to, from , next) => {
  if(to.meta.auth) {
    // 需要认证,则检查令牌
    if(store.state.token) { // 已登录
      next()
    } else { // 未登录
      // 去登陆页登录
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  } else {
    next()
  }
})
export default router
