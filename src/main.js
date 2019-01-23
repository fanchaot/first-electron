import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import interceptor from './http-interceptor'
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";
fundebug.apikey = "ed68e9d6381e83688c2bf529402720e8412a168edf1989f2f4a99bf61c05a74e"
fundebugVue(fundebug, Vue);
Vue.config.productionTip = false

Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
