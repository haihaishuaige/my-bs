import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Users from '../views/users/Users.vue'
import Right from '../views/right/Right.vue'
import Role from '../views/right/Role.vue'
import Webcome from '../views/webcome/Webcome.vue'
import Goods from '../views/goods/Goods.vue'
import Categories from '../views/goods/Categories.vue'
import Params from '../views/goods/Params.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/Home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {name: 'Webcome', path: 'webcome', component: Webcome},
        {name: 'users', path: 'users', component: Users},
        {name: 'Right', path: 'rights', component: Right},
        {name: 'Role', path: 'roles', component: Role},
        {name: 'Goods', path: 'goods', component: Goods},
        {name: 'Categories', path: 'categories', component: Categories},
        {name: 'Params', path: 'params', component: Params}
      ]
    }
  ]
})
