const History = {
    _history: [], // 历史记录堆栈
    install (Vue) {
        // 提供Vue 插件所需的安装方法
        Object.defineProperty(Vue.prototype, '$routerHistory', {
            get () {
                return History
            }
        })
    },
    push (path) { // 入栈操作
        this._history.push(path)
    },
    pop () {
        this._history.pop()
    },
    canBack () {
        return this._history.length > 1
    }
}
export default History