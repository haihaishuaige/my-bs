import Vue from 'vue'
import Vuex from 'vuex'

// 让vue使用vuex工具来实现组件之间的数据共享
Vue.use(Vuex)

// 存储数据的对象，我们可以将你需要存储的数据在这个state中定义
const state = {
  // 当前登陆的用户名
  username: ''
}
const mutations = {
  // 提供一个方法，为state中的username赋值
//   这些方法有一个默认的参数，这个参数就是当前store中的State
  setUserName (state, username) {
    state.username = username
    localStorage.setItem('myname', username)
  },
  getUserName (state) {
    return state.username
  }
}
const actions = {
  setUserNameAction: ({commit}, username) => {
    commit('setUserName', username)
  },
  getUserNameAction: ({commit}) => {
    commit('getUserName')
  }
}
const getters = {
  getUserName: (state) => {
    return localStorage.getItem('myname')
  }
}

export default new Vuex.Store({
  // 如果添加了严格模式，那么直接修改state中的数据会报错：Do not mutate vuex store state outside mutation handlers，所以还是需要使用mutations中的函数进行数据的修改
  strict: true,
  state,
  getters,
  actions,
  mutations
})
