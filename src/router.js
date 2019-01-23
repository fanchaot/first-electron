import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'
import store from './store';
import History from './utils/history.js';

Vue.use(Router)
Vue.use(History)
// 实例化之前, 扩展Router
Router.prototype.goBack = function () {
  this.isBack = true
  this.back()
}

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
// 守卫
router.beforeEach((to, from , next) => {
  if(to.meta.auth) { // 查看路由是否需要登录
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
// afterEach 记录历史记录
router.afterEach((to, form) => {
  if (router.isBack) {
    // 后退
    History.pop()
    router.isBack = false
  } else {
    History.push(to.path)
  }
})
export default router
