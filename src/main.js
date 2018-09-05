// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
Vue.use(ElementUI)
Vue.config.productionTip = false
// 路由首位
router.beforeEach((to, from, next) => {
  // 获取token  查看有没有，如果有就是已经登陆
  var mytoken = localStorage.getItem('mytoken')
  if (mytoken) {
    next()
  } else {
    if (to.path === '/Login') {
      next()
    } else {
      next({path: '/Login'})
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
