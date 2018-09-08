import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Users from '../views/users/Users.vue'
import Right from '../views/right/Right.vue'
import Role from '../views/right/Role.vue'
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
        {name: 'users', path: 'users', component: Users},
        {name: 'Right', path: 'right', component: Right},
        {name: 'Role', path: 'role', component: Role}
      ]
    }
  ]
})
