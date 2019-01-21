
// 拦截axios所有http请求, 预先放入token请求头
import axios from "axios";
import store from './store'
import router from "./router";
axios.interceptors.request.use(
    config => {
        if (store.state.token) { // 若存在令牌,则放入请求头
            config.headers.token = store.state.token
        }
        return config
    }
)
// 响应拦截去, 提前处理响应
axios.interceptors.response.use(
    response => {
        // 如果code是 -1 说明用户已注销或者token过期
        // 此时需要重新登录 并且还要清除本地缓存信息
        if (response.status == 200) {
           const data = response.data
           if (data.code == -1) {
            // 清除缓存
            store.commit('setToken', ''),
            localStorage.removeItem('token')

            // 跳转登录页
            router.push({path: '/login', query: router.currentRoute.path})
           }
        }
        return response
    },
    err => {
        console.log(err)
    }
)